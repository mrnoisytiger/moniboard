<?php

    // Load Libraries
    require '../vendor/autoload.php';

    // Parse configuration ini
    $config = parse_ini_file('../config.ini');

    echo $config['db_host'];

?>