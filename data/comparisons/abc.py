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
    
    for idx, line in enumerate(lines):
        if line.strip() == "keywords:":
            start_idx = idx
            in_keywords_section = True
        elif in_keywords_section and line.strip().startswith("-"):
            continue
        elif in_keywords_section and not line.strip().startswith("-"):
            end_idx = idx
            break

    if start_idx is not None and end_idx is not None:
        keyword_lines = lines[start_idx:end_idx]
        keywords_text = ''.join(keyword_lines)
        formatted_keywords = convert_keywords_format(keywords_text)
        lines = lines[:start_idx] + [formatted_keywords + '\n'] + lines[end_idx:]
    
    with open(file_path, 'w') as file:
        file.writelines(lines)

def process_folder(folder_path):
    for file_path in glob.glob(os.path.join(folder_path, '*.mdx')):
        process_file(file_path)
        print(f"Processed {file_path}")

# Example usage
folder_path = 'path_to_your_folder'  # Replace with the path to your folder containing .mdx files
process_folder(folder_path)
