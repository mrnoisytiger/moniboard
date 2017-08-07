<?php

    // Get POST data
    $view_id = $_POST['view_id'];

     // Load Libraries
    require '../vendor/autoload.php';

    // Parse configuration ini
    $config = parse_ini_file('../config.ini');

    // Connect to MongoDB
    $db = new MongoDB\Client("mongodb://" . $config['db_host'] . ":" . $config['db_port'], array(
        "username" => $config['db_user'],
        "password" => $config['db_pass'],
        "ssl" => true,
    ));
    $collection = $db->dev->moniboard;

    // Find the matching document with the same View ID as the one clicked
    $result = $collection->findOne(array(
        "view-id" => $view_id
    ));

    echo json_encode($result);
?>