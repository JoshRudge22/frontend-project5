import re

def extract_cloudinary_credentials(file_path):
    try:
        with open(file_path) as f:
            content = f.readlines()

        # Adjusting line indexing to be zero-based
        if len(content) < 17:
            print("Error: The file does not contain enough lines.")
            return None

        # Using regex to find credentials in specified lines
        cloud_name = re.findall(r"['](.*?)[']", content[14])
        api_key = re.findall(r"['](.*?)[']", content[15])
        api_secret = re.findall(r"['](.*?)[']", content[16])

        # Check if the values were found
        if not cloud_name or not api_key or not api_secret:
            print("Error: Failed to extract credentials.")
            return None

        # Construct the Cloudinary URL
        cloudinary_url = f"cloudinary://{api_key[0]}:{api_secret[0]}@{cloud_name[0]}"
        return cloudinary_url

    except FileNotFoundError:
        print("Error: The file 'cloudinary_python.txt' was not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# File path
file_path = "cloudinary_python.txt"

# Extract credentials and print the Cloudinary URL
cloudinary_url = extract_cloudinary_credentials(file_path)
if cloudinary_url:
    print(cloudinary_url)
