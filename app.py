import gradio as gr
from fastai.vision.all import * 

learn = load_learner('export.pkl')
categories = ('altocumulus', 'altostratus', 'cirrocumulus', 'cirrostratus', 'cirrus', 'cumulonimbus', 'cumulus', 'nimbostratus', 'stratocumulus', 'stratus')

def classifier(img):
    pred, idx, prob = learn.predict(img)
    return dict(zip(categories, map(float, prob)))

image = gr.inputs.Image(shape = (192, 192))
label = gr.outputs.Label()


iface = gr.Interface(fn=classifier, inputs=image, outputs=label)
iface.launch(inline = False)