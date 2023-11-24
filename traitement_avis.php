<?php
// Vérifiez si les données du formulaire ont été soumises
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérez les données du formulaire
    $avisText = $_POST['avisText'];
    $auteur = $_POST['auteur'];
    $rating = $_POST['rating'];

    // Effectuez toute validation ou traitement nécessaire ici

    // Connexion à la base de données (utilisez les informations de connexion à votre base de données)
    $dsn = "mysql:host=localhost;dbname=dbidea";
    $nomUtilisateur = "root";
    $motDePasse = "";

    try {
        $connexion = new PDO($dsn, $nomUtilisateur, $motDePasse);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Utilisation d'une requête préparée pour éviter les attaques par injection SQL
        $requete = $connexion->prepare("INSERT INTO avis (etoiles, nom_utilisateur, commentaire) VALUES (:rating, :auteur, :avisText)");

        // Liaison des paramètres
        $requete->bindParam(':rating', $rating);
        $requete->bindParam(':auteur', $auteur);
        $requete->bindParam(':avisText', $avisText);

        // Exécution de la requête
        $requete->execute();

        echo "Avis enregistré avec succès.";
    } catch (PDOException $e) {
        echo "Erreur lors de l'enregistrement de l'avis : " . $e->getMessage();
    } finally {
        // Fermez la connexion à la base de données
        $connexion = null;
    }
} else {
    // Si la requête n'est pas de type POST, renvoyez une erreur
    echo "Erreur : la requête doit être de type POST.";
}
?>
