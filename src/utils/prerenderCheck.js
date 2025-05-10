/**
 * أداة للتحقق من إعدادات Prerender وإمكانية وصول Googlebot
 * قم بتشغيل هذا الملف باستخدام Node.js للتحقق من الإعدادات
 */

const axios = require('axios');
const chalk = require('chalk');

const SITE_URL = 'https://www.learnhubjo.com'; // استبدل بعنوان موقعك
const USER_AGENTS = {
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  normal: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function checkPrerender() {
  console.log(chalk.blue('=== التحقق من إعدادات Prerender ==='));
  
  try {
    // التحقق من الوصول العادي
    console.log(chalk.yellow('التحقق من الوصول العادي...'));
    const normalResponse = await axios.get(SITE_URL, {
      headers: { 'User-Agent': USER_AGENTS.normal }
    });
    console.log(chalk.green('✓ الوصول العادي يعمل بشكل صحيح'));
    console.log(`  Status: ${normalResponse.status}`);
    console.log(`  Content Type: ${normalResponse.headers['content-type']}`);
    
    // التحقق من وصول Googlebot
    console.log(chalk.yellow('\nالتحقق من وصول Googlebot...'));
    const googlebotResponse = await axios.get(SITE_URL, {
      headers: { 'User-Agent': USER_AGENTS.googlebot }
    });
    console.log(chalk.green('✓ وصول Googlebot يعمل بشكل صحيح'));
    console.log(`  Status: ${googlebotResponse.status}`);
    
    // التحقق من وجود علامات <meta name="prerender-status-code">
    const hasPrerender = googlebotResponse.data.includes('prerender');
    if (hasPrerender) {
      console.log(chalk.green('✓ تم العثور على علامات Prerender في الصفحة المقدمة لـ Googlebot'));
    } else {
      console.log(chalk.red('✗ لم يتم العثور على علامات Prerender في الصفحة المقدمة لـ Googlebot'));
      console.log('  تأكد من أن Prerender يعمل بشكل صحيح وأن الصفحة تُقدم بشكل مختلف للزحف');
    }
    
    // التحقق من وصول Bingbot
    console.log(chalk.yellow('\nالتحقق من وصول Bingbot...'));
    const bingbotResponse = await axios.get(SITE_URL, {
      headers: { 'User-Agent': USER_AGENTS.bingbot }
    });
    console.log(chalk.green('✓ وصول Bingbot يعمل بشكل صحيح'));
    console.log(`  Status: ${bingbotResponse.status}`);
    
    // مقارنة الاستجابات
    console.log(chalk.yellow('\nمقارنة الاستجابات...'));
    const normalHasScripts = (normalResponse.data.match(/<script/g) || []).length;
    const botHasScripts = (googlebotResponse.data.match(/<script/g) || []).length;
    
    if (normalHasScripts > botHasScripts) {
      console.log(chalk.green('✓ الصفحة المقدمة لـ Googlebot تحتوي على عدد أقل من علامات <script>'));
      console.log(`  عدد علامات <script> للمستخدم العادي: ${normalHasScripts}`);
      console.log(`  عدد علامات <script> لـ Googlebot: ${botHasScripts}`);
    } else {
      console.log(chalk.red('✗ الصفحة المقدمة لـ Googlebot تحتوي على نفس عدد علامات <script> أو أكثر'));
      console.log('  هذا قد يشير إلى أن Prerender لا يعمل بشكل صحيح');
    }
    
  } catch (error) {
    console.log(chalk.red('✗ حدث خطأ أثناء التحقق:'));
    console.log(error.message);
    if (error.response) {
      console.log(`  Status: ${error.response.status}`);
      console.log(`  Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
    }
  }
}

checkPrerender();