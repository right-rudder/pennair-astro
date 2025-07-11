#!/usr/bin/env node

/**
 * SEO Validation Script for Penn Air Repair
 * This script checks for common SEO issues in the built site
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seoChecks = {
  missingMetaDescription: [],
  missingTitles: [],
  duplicateTitles: [],
  missingH1: [],
  multipleH1: [],
  missingAltText: [],
  brokenInternalLinks: [],
  issues: [],
};

const titles = new Set();

// Function to extract content between tags
function extractContent(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, "gi");
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

// Function to check for meta description
function hasMetaDescription(html) {
  return (
    html.includes('name="description"') ||
    html.includes('property="og:description"')
  );
}

// Function to count H1 tags
function countH1Tags(html) {
  const h1Regex = /<h1[^>]*>/gi;
  const matches = html.match(h1Regex);
  return matches ? matches.length : 0;
}

// Function to check for images without alt text
function checkImageAltText(html) {
  const imgRegex = /<img[^>]*>/gi;
  const images = html.match(imgRegex) || [];
  const missingAlt = [];

  images.forEach((img) => {
    if (
      !img.includes("alt=") ||
      img.includes('alt=""') ||
      img.includes("alt=''")
    ) {
      missingAlt.push(img);
    }
  });

  return missingAlt;
}

// Function to validate a single HTML file
function validateHTMLFile(filePath, relativePath) {
  try {
    const html = fs.readFileSync(filePath, "utf8");

    // Check title
    const titles_found = extractContent(html, "title");
    if (titles_found.length === 0) {
      seoChecks.missingTitles.push(relativePath);
    } else {
      const title = titles_found[0];
      if (titles.has(title)) {
        seoChecks.duplicateTitles.push({ path: relativePath, title });
      } else {
        titles.add(title);
      }
    }

    // Check meta description
    if (!hasMetaDescription(html)) {
      seoChecks.missingMetaDescription.push(relativePath);
    }

    // Check H1 tags
    const h1Count = countH1Tags(html);
    if (h1Count === 0) {
      seoChecks.missingH1.push(relativePath);
    } else if (h1Count > 1) {
      seoChecks.multipleH1.push({ path: relativePath, count: h1Count });
    }

    // Check image alt text
    const missingAltImages = checkImageAltText(html);
    if (missingAltImages.length > 0) {
      seoChecks.missingAltText.push({
        path: relativePath,
        images: missingAltImages.slice(0, 3), // Show first 3 examples
      });
    }
  } catch (error) {
    seoChecks.issues.push(`Error reading ${relativePath}: ${error.message}`);
  }
}

// Function to recursively find HTML files
function findHTMLFiles(dir, baseDir = dir) {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findHTMLFiles(fullPath, baseDir));
      } else if (item.endsWith(".html")) {
        const relativePath = path.relative(baseDir, fullPath);
        files.push({ fullPath, relativePath });
      }
    }
  } catch (error) {
    seoChecks.issues.push(`Error reading directory ${dir}: ${error.message}`);
  }

  return files;
}

// Main function
function runSEOCheck() {
  console.log("🔍 Running SEO validation for Penn Air Repair...\n");

  const distDir = path.join(__dirname, "..", "dist");

  if (!fs.existsSync(distDir)) {
    console.error(
      '❌ Build directory not found. Please run "npm run build" first.',
    );
    process.exit(1);
  }

  const htmlFiles = findHTMLFiles(distDir);

  if (htmlFiles.length === 0) {
    console.log("No HTML files found in dist directory.");
    return;
  }

  console.log(`Found ${htmlFiles.length} HTML files to check...\n`);

  // Validate each file
  htmlFiles.forEach(({ fullPath, relativePath }) => {
    validateHTMLFile(fullPath, relativePath);
  });

  // Report results
  console.log("📊 SEO Validation Results:");
  console.log("=".repeat(50));

  let totalIssues = 0;

  if (seoChecks.missingTitles.length > 0) {
    console.log(`\n❌ Missing Titles (${seoChecks.missingTitles.length}):`);
    seoChecks.missingTitles.forEach((path) => console.log(`  - ${path}`));
    totalIssues += seoChecks.missingTitles.length;
  }

  if (seoChecks.duplicateTitles.length > 0) {
    console.log(
      `\n⚠️  Duplicate Titles (${seoChecks.duplicateTitles.length}):`,
    );
    seoChecks.duplicateTitles.forEach(({ path, title }) => {
      console.log(`  - ${path}: "${title}"`);
    });
    totalIssues += seoChecks.duplicateTitles.length;
  }

  if (seoChecks.missingMetaDescription.length > 0) {
    console.log(
      `\n❌ Missing Meta Descriptions (${seoChecks.missingMetaDescription.length}):`,
    );
    seoChecks.missingMetaDescription.forEach((path) =>
      console.log(`  - ${path}`),
    );
    totalIssues += seoChecks.missingMetaDescription.length;
  }

  if (seoChecks.missingH1.length > 0) {
    console.log(`\n❌ Missing H1 Tags (${seoChecks.missingH1.length}):`);
    seoChecks.missingH1.forEach((path) => console.log(`  - ${path}`));
    totalIssues += seoChecks.missingH1.length;
  }

  if (seoChecks.multipleH1.length > 0) {
    console.log(`\n⚠️  Multiple H1 Tags (${seoChecks.multipleH1.length}):`);
    seoChecks.multipleH1.forEach(({ path, count }) => {
      console.log(`  - ${path}: ${count} H1 tags found`);
    });
    totalIssues += seoChecks.multipleH1.length;
  }

  if (seoChecks.missingAltText.length > 0) {
    console.log(
      `\n❌ Missing Alt Text (${seoChecks.missingAltText.length} pages):`,
    );
    seoChecks.missingAltText.forEach(({ path, images }) => {
      console.log(`  - ${path}: ${images.length} images without alt text`);
    });
    totalIssues += seoChecks.missingAltText.length;
  }

  if (seoChecks.issues.length > 0) {
    console.log(`\n🐛 Processing Issues (${seoChecks.issues.length}):`);
    seoChecks.issues.forEach((issue) => console.log(`  - ${issue}`));
  }

  console.log("\n" + "=".repeat(50));

  if (totalIssues === 0) {
    console.log("✅ No SEO issues found! Great job!");
  } else {
    console.log(`⚠️  Found ${totalIssues} SEO issues to address.`);
  }

  console.log(`\n📈 Summary:`);
  console.log(`  - Files checked: ${htmlFiles.length}`);
  console.log(`  - Unique titles: ${titles.size}`);
  console.log(`  - Issues found: ${totalIssues}`);
}

// Run the SEO check
runSEOCheck();
