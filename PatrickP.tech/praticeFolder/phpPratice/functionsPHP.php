<?php 
    
        class Output {

            private $name;
            private $phone;
            private $text;
            private $eMail;


            function __construct(){
                $this->name = $_POST["userName"];
                $this->phone = $_POST["byPhone"];
                $this->text = $_POST["byText"];
                $this->eMail = $_POST["byEmail"];
            }

            function __destruct(){

            }

            function outPutAll(){
                echo $this->name;
                echo $this->phone;
                echo $this->text;
                echo $this->eMail;
            }

        }
        
        $object = new Output;
        $object->outPutAll();
        
    
    ?>