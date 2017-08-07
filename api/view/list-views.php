<?php

    // Load Libraries
    require '../vendor/autoload.php';

    // Parse configuration ini
    $config = parse_ini_file('../config.ini');

    // Connect to MongoDB
    $db = new MongoClient("mongodb://" . $config['db_host'], array(
        "username" => $config['db_user'],
        "password" => $config['db_pass'];
    ));
    var_dump($db);

?>