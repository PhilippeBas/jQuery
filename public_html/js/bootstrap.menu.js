var Menu= {}


/**
 * Génére un menu bootstrap
 * @param {string} filename nom du fichier json
 * @param {string} container id du container du menu
 * @param {string} theme bootstrap du menu : light ou dark 
 */
Menu.load = function(filename,container, theme){
    
    if(!theme)
    {theme = "navbar-light bg-light";
    }
    else
    { 
        theme = "navbar-"+theme+" bg-"+theme;
    }

 //--- création
            $.getJSON(filename, function(json){
               // console.log(json); //--- pour test le fichier  avec f12/console
               //---    La barre de nav
               var nav = $('<nav class="navbar navbar-expand-lg navbar-light ' + theme+'">').prependTo(container);
               $('<a class="navbar-brand" href="#">'+ json.title+'</a>').appendTo(nav);
               var btn = $('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">').appendTo(nav);
               $('<span class="navbar-toggler-icon">').appendTo(btn);
               //--- le menu
               var main = $('<div class="collapse navbar-collapse" id="navbarMain">').appendTo(nav);
               var ul = $('<ul class="navbar-nav mr-auto">').appendTo(main);
               var data = json.data;
               //--- lecture de data menu.JSON avec un for in => car je dois récuper le nom et sa clé
               //console.log(data[item]);
                for (var item in json.data){
                    if (typeof data[item] === 'string'){
                        var li = $('<li class="nav-item">').appendTo(ul);
                        $('<a class="nav-link" href="'+data[item]+'">'+item+'</a>').appendTo(li);
                    }else{
                        var li = $('<li class="nav-item dropdown">').appendTo(ul);
                         $('<a class="nav-link dropdown-toggle" href="#" id="'+item+'" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">')
                         .appendTo(li).text(item);
                         var div = $('<div class="dropdown-menu" aria-labelledby="'+item+'">').appendTo(li);
                             for (var subItem in data[item]){
                               $('<a class="dropdown-item" href="'+data[item][subItem]+'">'+subItem+'</a>').appendTo(div);
                             }//---for
                    }
                } //--- fin du for
               
            }); //---fin de getJSON

}