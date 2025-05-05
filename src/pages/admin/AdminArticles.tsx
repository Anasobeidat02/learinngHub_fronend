import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Pencil, Trash2, FileJson } from "lucide-react";
import ArticleForm from "@/components/admin/ArticleForm";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/api";

interface Library {
  name: string;
  description: string;
  url: string;
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  requirements: string[];
  useCases: string[];
  libraries: Array<{
    name: string;
    description: string;
    url: string;
  }>;
  language: string;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showJsonImportDialog, setShowJsonImportDialog] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const { toast } = useToast();

  // Color gradient map similar to ProgrammingLanguages.tsx and ArticleDetail.tsx
  const getGradient = (color: string) => {
    const gradients: { [key: string]: string } = {
      blue: "bg-gradient-to-br from-blue-500 to-purple-600",
      red: "bg-gradient-to-br from-red-500 to-orange-600",
      green: "bg-gradient-to-br from-green-500 to-teal-600",
      yellow: "bg-gradient-to-br from-yellow-500 to-amber-600",
      purple: "bg-gradient-to-br from-purple-500 to-indigo-600",
      pink: "bg-gradient-to-br from-pink-500 to-rose-600",
      teal: "bg-gradient-to-br from-teal-500 to-cyan-600",
      orange: "bg-gradient-to-br from-orange-500 to-amber-600",
      indigo: "bg-gradient-to-br from-indigo-500 to-blue-600",
      cyan: "bg-gradient-to-br from-cyan-500 to-sky-600",
      silver: "bg-gradient-to-br from-gray-400 to-gray-600",
      black: "bg-gradient-to-br from-gray-700 to-gray-900",
    };
    return (
      gradients[color.toLowerCase()] ||
      "bg-gradient-to-br from-slate-500 to-gray-600"
    );
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (formData: any) => {
    try {
      await createArticle(formData);
      setShowDialog(false);
      toast({
        title: "Success",
        description: "Article created successfully",
      });
      fetchArticles();
    } catch (error) {
      console.error("Error creating article:", error);
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      });
    }
  };

  const handleUpdateArticle = async (formData: any) => {
    if (!currentArticle?._id) {
      console.log("No current article ID found");
      return;
    }
  
    console.log("handleUpdateArticle called with formData:", formData);
    console.log("Article ID:", currentArticle._id);
  
    try {
      const response = await updateArticle(currentArticle._id, formData);
      console.log("updateArticle response:", response);
      setShowDialog(false);
      setCurrentArticle(undefined);
      toast({
        title: "Success",
        description: "Article updated successfully",
      });
      fetchArticles();
    } catch (error) {
      console.error("Error updating article:", error);
      toast({
        title: "Error",
        description: `Failed to update article: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setJsonData(content);
      } catch (error) {
        console.error("Error reading file:", error);
        toast({
          title: "Error",
          description: "Failed to read JSON file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleJsonImport = async () => {
    try {
      if (!jsonData) {
        toast({
          title: "Error",
          description: "No JSON data provided",
          variant: "destructive",
        });
        return;
      }

      // Parse JSON data
      const parsedData = JSON.parse(jsonData);

      // Handle both single article and array of articles
      const articlesToImport = Array.isArray(parsedData)
        ? parsedData
        : [parsedData];

      // Create each article
      let successCount = 0;
      for (const article of articlesToImport) {
        await createArticle(article);
        successCount++;
      }

      setShowJsonImportDialog(false);
      setJsonData("");
      toast({
        title: "Success",
        description: `${successCount} article(s) imported successfully`,
      });
      fetchArticles();
    } catch (error) {
      console.error("Error importing articles from JSON:", error);
      toast({
        title: "Error",
        description:
          "Failed to import articles. Please check your JSON format.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (article: Article) => {
    setCurrentArticle(article);
    setIsEditing(true);
    setShowDialog(true);
  };

  const openCreateDialog = () => {
    setCurrentArticle(undefined);
    setIsEditing(false);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setCurrentArticle(undefined);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-10 h-10 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Programming Articles</h1>
          <p className="text-gray-500">Manage programming language articles</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> Add New Article
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowJsonImportDialog(true)}
          >
            <FileJson className="mr-2 h-4 w-4" /> Import JSON
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length === 0 ? (
              <div className="col-span-full p-8 text-center">
                <p className="text-xl text-gray-500">No articles found</p>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <Card key={article._id} className="overflow-hidden">
                  <div
                    className={`${getGradient(
                      article.color
                    )} p-4 flex items-center gap-3 !bg-gradient-to-br`}
                  >
                    {article.icon && (
                      <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                        <img
                          src={article.icon}
                          alt={article.title}
                          className="w-6 h-6"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-white truncate">
                      {article.title}
                    </h3>
                  </div>

                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {article.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        Updated:{" "}
                        {new Date(article.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => openEditDialog(article)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Article
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{article.title}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteArticle(article._id)}
                                className="bg-red-500 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Article" : "Create New Article"}
            </DialogTitle>
            <p id="dialog-description" className="sr-only">
              Form to {isEditing ? "edit" : "create"} an article
            </p>
          </DialogHeader>
          <ArticleForm
            initialData={currentArticle}
            onSubmit={isEditing ? handleUpdateArticle : handleCreateArticle}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>

      {/* JSON Import Dialog */}
      <Dialog
        open={showJsonImportDialog}
        onOpenChange={setShowJsonImportDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import Articles from JSON</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="json-file">Upload JSON File</Label>
              <Input
                id="json-file"
                type="file"
                accept=".json"
                onChange={handleJsonFileUpload}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="json-data">Or Paste JSON Content</Label>
              <textarea
                id="json-data"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="w-full h-40 border rounded-md p-2 mt-1"
                placeholder='{
  "title": "Example Language",
  "description": "Description here",
  "content": "Content here",
  "requirements": ["req1", "req2"],
  "useCases": ["use1", "use2"],
  "libraries": [{"name": "lib1", "description": "desc", "url": "http://example.com"}],
  "language": "en",
  "icon": "url",
  "color": "blue"
}'
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowJsonImportDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleJsonImport}>Import</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminArticles;