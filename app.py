from flask import Flask, request, render_template
from inference import get_category, plot_category
from datetime import datetime
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.config['ALLOWED_EXTENSIONS'] = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']


@app.route('/', methods=['GET', 'POST'])

def batikclass():
    if request.method == 'POST':
        # POST method to post the results file
        # Check if the file is present in the request
        if 'file' not in request.files:
            return render_template('index.html', error='No file part')

        # Read file from upload
        img = request.files['file']

        # Check if the file has an allowed extension
        if img and allowed_file(img.filename):
            # Get category of prediction
            image_category = get_category(img)
            
            # Plot the category
            now = datetime.now()
            current_time = now.strftime("%H-%M-%S")
            plot_category(img, current_time)
            
            # Render the result template
            return render_template('result.html', category=image_category, current_time=current_time)

        else:
            return render_template('index.html', error='Invalid file extension. Allowed extensions are: png, jpg, jpeg')

    # For GET requests, load the index file
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
