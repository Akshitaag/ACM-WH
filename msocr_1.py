import requests
# If you are using a Jupyter notebook, uncomment the following line.
#%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from PIL import Image
from io import BytesIO
import sys
import json
import re
# Replace <Subscription Key> with your valid subscription key.
subscription_key = "271dbaf8fcfe4ab387e4157c7948b0ce"
assert subscription_key

# You must use the same region in your REST call as you used to get your
# subscription keys. For example, if you got your subscription keys from
# westus, replace "westcentralus" in the URI below with "westus".
#
# Free trial subscription keys are generated in the westcentralus region.
# If you use a free trial subscription key, you shouldn't need to change
# this region.
vision_base_url = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/"

ocr_url = vision_base_url + "ocr"

# Set image_url to the URL of an image that you want to analyze.
#image_url = "https://www.zachleat.com/web/wp-content/uploads/2011/01/Screen-shot-2011-01-11-at-7.37.54-PM.png"
#image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/" + \
    #"Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png"

image_url = "https://upload.wikimedia.org/wikipedia/commons/7/7f/Lolol.png"
headers = {'Ocp-Apim-Subscription-Key': subscription_key}
params  = {'language': 'unk', 'detectOrientation': 'true'}
data    = {'url': image_url}
response = requests.post(ocr_url, headers=headers, params=params, json=data)
response.raise_for_status()

analysis = response.json()
str1 = str(analysis)
#str1=json.loads(json.dumps(analysis))
tuples = re.findall(r"'text':.*?}", str1)
#print(tuples)

final=""
for i in range(len(tuples)):
    final+=tuples[i].split('\':')[1][:-1][1:-1]
    final+=" "
final=final.replace("'","")   
print(final)

# Extract the word bounding boxes and text.
