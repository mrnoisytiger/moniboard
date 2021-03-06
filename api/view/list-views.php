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
    $collection = $db->$config['db_name']->$config['db_collection'];
    
    // Find all view records
    $result = $collection->find(array(
        "view-id" => array('$exists'=> true)
    ));

    $data = array();
    
    // Add all the views into an array and then send it off
    foreach ($result as $doc) {
       array_push($data, $doc);
    }

    echo json_encode($data);

?>