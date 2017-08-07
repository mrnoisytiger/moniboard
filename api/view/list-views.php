<?php

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
    
    // Find all view records
    $result = $collection->find(array(
        "view-id" => array('$exists'=> true)
    ));

   // $result = $collection->find();

    $data = array();
    
    foreach ($result as $doc) {
       array_push($data, $doc);
    }

    echo json_encode($data);

?>