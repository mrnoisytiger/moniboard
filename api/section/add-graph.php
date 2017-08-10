<?php

    $data = json_decode($_POST['formdata'], true);

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

    $section_id = $data['section-id'];
    unset($data['section-id']);

    $collection->updateOne(array( 
        "section-id" => $section_id,
        "section-name" => array('$exists'=> true)
    ), array(
        '$push' => array(
            "graphs" => $data
        ) 
    ));
?>