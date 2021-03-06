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
    $collection = $db->$config['db_name']->$config['db_collection'];

    // Find the matching document with the same View ID as the one clicked
    $view_result = $collection->findOne(array(
        "view-id" => $view_id
    ));

    $all_sections = array();

    foreach ($view_result['sections'] as $section_id) {
        $section_result = $collection->findOne(array(
            "section-id" => $section_id,
            "section-name" => array('$exists'=> true)
        ));

        array_push($all_sections, $section_result);
    }

    echo json_encode($all_sections);

?>