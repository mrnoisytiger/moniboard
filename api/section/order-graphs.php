<?php
    // Receive relevant POST data
    $graphs_order = json_decode($_POST['graphs-order']);
    $section_id = $_POST['section-id'];

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

    // Find the section matching the section ID as received from JS
    $section_result = $collection->findOne(array(
        "section-id" => $section_id,
        "section-name" => array('$exists'=> true)
    ));

    // Loop through the graph id's received. Search the section for that graph ID, and when found, update it the order attribute of the parent object with the index of the array
    for ($i = 0; $i < count($graphs_order); $i++) {
        foreach ($section_result['graphs'] as &$value) {
            if ( $value['graph-id'] == $graphs_order[$i] ) {
                $value['order'] = $i;
                break;
            }
        }
    }
  
    // Send all the updates to Mongo
    $collection->updateOne(array(
        "section-id" => $section_id,
        "section-name" => array('$exists' => true)
    ), array(
        '$set' => $section_result
    ));
?>