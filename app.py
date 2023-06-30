import base64
import os
from flask import Flask, request,render_template,url_for

import io



app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    image_data = request.form.get('urlFile')
    
    # Convertir les données encodées en base64 en fichier image
    if image_data:
        # Supposons que vous souhaitez enregistrer les images dans un dossier "uploads"
        upload_folder = 'uploads'
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        
        # Générer un nom de fichier unique pour éviter les conflits
        filename = "test.png"
        image_path = os.path.join(upload_folder, filename)
        
        
        # Enregistrer l'image sur le serveur
        save_base64_image(image_data, image_path)
        
        # Répondre avec le chemin de l'image téléchargée
        # return image_path

    return 'Aucune donnée d\'image n\'a été reçue.'



def save_base64_image(data_url, file_path):
    # Séparer le type MIME et les données de l'URL de données
    header, data = data_url.split(',', 1)
    # Extraire le type MIME
    mime_type = header.split(':')[1].split(';')[0]
    
    # Vérifier que le type MIME correspond à une image PNG
    if mime_type == 'image/png':
        # Décoder les données Base64
        image_data = base64.b64decode(data)
        
        # Enregistrer l'image dans le fichier spécifié
        with open(file_path, 'wb') as file:
            file.write(image_data)
    else:
        print("Le type MIME de l'image n'est pas pris en charge.")
    
if __name__ == '__main__':
    app.run()
