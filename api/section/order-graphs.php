<?php

    $debug_string ="";

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

    $section_result = $collection->findOne(array(
        "section-id" => $section_id,
        "section-name" => array('$exists'=> true)
    ));

    $section_graphs = $section_result['graphs'];

    for ($i = 0; $i < count($graph_order); $i++) {

        $debug_string += $i;

        foreach ($section_graphs as &$value) {
            if ( $value['graph-id'] == $graphs_order[$i] ) {

                $debug_string += $graphs_order[$i];

                $value['order'] = $i;

                $debug_string += $value['order'];
                
                break;
            }
        }
    }

    /*
    $collection->updateOne( array(
        "section-id" => $section_id,
        "section-name" => array('$exists' => true)
    ), array(
        '$set' => $section_result
    ));*/
    echo json_encode($section_graphs);

?>