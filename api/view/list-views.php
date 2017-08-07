<?php

    // Load Libraries
    require '../vendor/autoload.php';

    // Parse configuration ini
    $config = parse_ini_file('../config.ini');

    // Connect to MongoDB
    $db = new MongoDB\Client("mongodb://" . $config['db_host'], array(
        "username" => $config['db_user'],
        "password" => $config['db_pass'],
    ));
    $collection = $db->moniboard;
    
    // Find all view records
    $result = $collection->find(array(
        "view-id" => {'$exists'=> true}
    ));

    echo json_encode($result);

?>