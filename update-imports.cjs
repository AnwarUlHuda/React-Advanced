const fs = require('fs');
const path = require('path');

// Specify the directory to traverse (e.g., 'src')
const directory = path.join(__dirname, './node_modules/react-router-dom/dist/index.mjs'); // Adjust the directory as needed

// Function to update imports in the files
const updateImports = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace 'react-router/dom' with 'react-router-dom'
  const updatedContent = content.replace(
    /import\s*{\s*HydrateRouter,\s*RouterProvider\s*}\s*from\s*['"]react-router\/dom['"]/g,
    "import { HydrateRouter, RouterProvider } from 'react-router-dom';"
  );

  // Write the updated content back to the file if there were changes
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Updated import in: ${filePath}`);
  }
};

// Traverse the directory to find files to update
const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively traverse subdirectories
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.mjs') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      // Update the file if it's a JavaScript or TypeScript file
      updateImports(fullPath);
    }
  });
};

// Start the traversal from the specified directory
traverseDirectory(directory);
