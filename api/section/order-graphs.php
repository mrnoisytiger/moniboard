<?php

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
    $collection = $db->dev->moniboard;

    for ($i = 0; $i < count($graphs_order); $i++) {
        $collection->update( array(
            "section-id" => $section_id,
            "graphs.graph-id" => $graphs_order[$i]
        ), array(
            '$set' => array(
                "graphs.$.order" => $i + 1;
            ),
        ));
    }

?>