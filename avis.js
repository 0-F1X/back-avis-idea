const etoiles = document.querySelectorAll('.etoile');
const avisForm = document.getElementById('avisForm');
const submitBtn = document.getElementById('submitBtn');

etoiles.forEach((etoile, index) => {
    etoile.addEventListener('click', () => {
        const selectedRating = etoile.getAttribute('data-rating');
        etoiles.forEach((e, i) => {
            if (i <= index) {
                e.classList.add('allume');
            } else {
                e.classList.remove('allume');
            }
        });

        avisForm.style.display = 'block';

        // Stockez la note sélectionnée dans un champ caché du formulaire
        document.getElementById('ratingInput').value = selectedRating;
    });
});

submitBtn.addEventListener('click', () => {
    const avisText = document.getElementById('avisText').value;
    const auteur = document.getElementById('auteur').value;
    const rating = document.getElementById('ratingInput').value;

    // Créez un objet FormData pour faciliter l'envoi des données du formulaire
    const formData = new FormData();
    formData.append('avisText', avisText);
    formData.append('auteur', auteur);
    formData.append('rating', rating);

    // Utilisez fetch pour envoyer les données au serveur
    fetch('../traitement_avis.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        // Réponse du serveur après traitement
        console.log(result);
        // Réinitialisez le formulaire après la soumission
        avisForm.style.display = 'none';
        etoiles.forEach(e => e.classList.remove('allume'));
        document.getElementById('avisText').value = '';
        document.getElementById('auteur').value = '';
        document.getElementById('ratingInput').value = '';
    })
    .catch(error => console.error('Erreur lors de l\'envoi des données au serveur:', error));
});

