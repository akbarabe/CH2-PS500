import io
import matplotlib
import tensorflow as tf
import numpy as np
import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from tensorflow import keras
from keras.preprocessing import image

# https: // stackoverflow.com/questions/53684971/assertion-failed-flask-server-stops-after-script-is-run
matplotlib.use('Agg')



def load_image(file_storage, target_size=(150, 150)):
    # Read binary data from FileStorage
    file_data = file_storage.read()

    # Convert binary data to image tensor
    img = image.img_to_array(image.load_img(io.BytesIO(file_data), target_size=target_size))
    img = np.expand_dims(img, axis=0)
    img /= 255.0  # Normalize the image
    return img

def get_category(file_storage):
    """Write a Function to Predict the Class Name

    Args:
        file_storage: werkzeug.datastructures.FileStorage object

    Returns:
        [str]: Prediction
    """
    # Load and preprocess the image using Keras
    img = load_image(file_storage)

    tflite_model_file = 'static/model/model.tflite'

    with open(tflite_model_file, 'rb') as fid:
        tflite_model = fid.read()

    interpreter = tf.lite.Interpreter(model_content=tflite_model)
    interpreter.allocate_tensors()

    input_index = interpreter.get_input_details()[0]["index"]
    output_index = interpreter.get_output_details()[0]["index"]

    # Set input tensor
    interpreter.set_tensor(input_index, img)

    # Invoke the interpreter
    interpreter.invoke()

    # Get the output tensor
    prediction = interpreter.get_tensor(output_index)

    predicted_label = np.argmax(prediction)
    class_names = ["Celup", "Insang", "Kawung", "Megamendung", "Parang", "Poleng", "Truntum"]

    return class_names[predicted_label]



# def plot_category(img):
def plot_category(img, current_time):
    """Plot the input image. Timestamp used to help Flask grab the correct image.

    Args:
        img [jpg]: image file
        current_time: timestamp
    """
    # Read an image from a file into a numpy array
    img = mpimg.imread(img)
    # Remove the plotting ticks
    plt.grid(False)
    plt.xticks([])
    plt.yticks([])
    plt.imshow(img, cmap=plt.cm.binary)
    # To make sure Flask grabs the correct image to plot
    strFile = f'static/images/output_{current_time}.png'
    if os.path.isfile(strFile):
        os.remove(strFile)
    # Save the image with the file name that result.html is using as its img src
    plt.savefig(strFile)
