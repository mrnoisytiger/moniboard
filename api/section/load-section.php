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
    $view_result = $collection->findOne(array(
        "view-id" => $view_id
    ));

    foreach ($view_result['sections'] as $section_id) {
        $section_result += $collection->findOne(array(
            "section-id" => $section_id,
            "section-name" => array('$exists'=> true)
        ));
    }

    echo json_encode($section_result);

?>