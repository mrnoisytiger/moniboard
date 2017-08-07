<?php

    // Load Libraries
    require '../vendor/autoload.php';

    // Parse configuration ini
    $config = parse_ini_file('../config.ini');

    // Connect to MongoDB
    $db = new MongoClient("mongodb://" . $config['db_user'] . ":" . $config['db_pass'] . "@" . $config['db_host'] . "/dev");
    var_dump($db);

?>