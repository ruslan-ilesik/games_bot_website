import requests
from flask import Flask, send_from_directory, redirect, request, Response
import os

app = Flask(__name__)

def forward_request(path):
    print("forwarding",path)
    target_url = f"http://localhost:8080{path}"
    # Send request to external server
    response = requests.get(target_url, allow_redirects=True, timeout=30)

    print(response.content)
    # If the response is a redirect (3xx), pass the redirect to the client
    if 300 <= response.status_code < 400:
        return redirect(response.headers['Location'], code=response.status_code)
    
    # Otherwise, return the response content
    return Response(response.content, status=response.status_code, content_type='application/json')



# Catch-all route for static file serving (requests that do not match the above)
@app.route('/<path:path>', methods=['GET'])
def static_files(path):
    if path.startswith("api") :
        return forward_request(f"/{path}")
    if path.startswith("auth"):
        return forward_request(f"/{path}")
    if path.startswith("action"):
        return forward_request(f"/{path}")
    # If the path is empty or just "/", treat it as "/index.html"
    if not path or path == "/":
        path = "index.html"

    # Define the full path for the static file (./out/ directory)
    file_path = os.path.join('./out', path)
    print(path)
    # Check if the file exists (with or without an extension)
    if os.path.exists(file_path):
        return send_from_directory('./out', path)
    
    # If no extension, check for .html (for static files like HTML)
    if os.path.exists(file_path + ".html"):
        return send_from_directory('./out', path + ".html")
    

    # If file doesn't exist, return a 404 error (or you could redirect)
    return "File not found", 404

# Start the Flask app
if __name__ == '__main__':
    app.run(port=8000, threaded=True)
