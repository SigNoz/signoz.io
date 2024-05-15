import os
import glob

def convert_keywords_format(input_text):
    lines = input_text.splitlines()
    keywords = []
    for line in lines:
        if line.strip().startswith("-"):
            keyword = line.strip().lstrip('-').strip()
            keywords.append(keyword)
    formatted_keywords = f"keywords: [{','.join(keywords)}]"
    return formatted_keywords

def process_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    
    start_idx = None
    end_idx = None
    in_keywords_section = False
    
    # Find the start and end index of the keywords section
    for idx, line in enumerate(lines):
        if line.strip() == "keywords:":
            start_idx = idx
            in_keywords_section = True
        elif in_keywords_section and line.strip().startswith("-"):
            continue
        elif in_keywords_section and not line.strip().startswith("-"):
            end_idx = idx
            break

    if start_idx is not None:
        if end_idx is None:  # Handle case where end_idx is not set
            end_idx = len(lines)
        
        keyword_lines = lines[start_idx:end_idx]
        keywords_text = ''.join(keyword_lines)
        formatted_keywords = convert_keywords_format(keywords_text)
        
        # Insert the formatted keywords and '---'
        lines = lines[:start_idx] + [formatted_keywords + '\n', '---\n'] + lines[end_idx:]
    
        # Write the modified content back to the file
        with open(file_path, 'w') as file:
            file.writelines(lines)
        print(f"Processed {file_path}")
    else:
        print(f"No keywords section found in {file_path}")

def process_folder(folder_path):
    for file_path in glob.glob(os.path.join(folder_path, '*.mdx')):
        process_file(file_path)

# Example usage
folder_path = '.'  # Replace with the path to your folder containing .mdx files
process_folder(folder_path)
