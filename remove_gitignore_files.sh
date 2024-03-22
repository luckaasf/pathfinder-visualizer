#!/bin/bash

# Read the .gitignore file and get the list of ignored files
ignored_files=$(grep -v '^#' .gitignore | grep -v '^$')

# Iterate over the ignored files and remove them from Git
while IFS= read -r file; do
    git rm --cached "$file"
done <<< "$ignored_files"
