<?php session_start();
include 'master.php';
 include './../Controller/controller_alerta.php';?>    


 	<title>	DETALLE ALERTAS</title>
	<script src="../assets/js/maps.js"></script>
	<script src="../mysql.js"></script>	
	<script>
	var place_id;
	function retornarPagina(){
			history.go(-1);
		}

		function showHide() {
	var element = document.getElementById("divseguimiento");
	if (element != null) {
		if(element.style.display != "none"){
			element.style.display = "none";
		}else{
			element.style.display = "block";
		}
	}
}
function alerta()
    {
	var element = document.getElementById("divseguimiento");
    var opcion = confirm("Confirma si has verificado la alerta");
    if (element != null) {
	if (opcion == true) {
        element.style.display = "block";
	} else {
	    element.style.display = "none";
	}}
	
}
	function solicitud(){									
		var element = document.getElementById("divseguimiento");
	if(element != null){
	element.style.display = "none";
}
		var latitude=document.getElementById("latitud").value; 
		var longitude=document.getElementById("longitud").value; 
		latitude=parseFloat(latitude);
		longitude=parseFloat(longitude);
		var Http = new XMLHttpRequest();
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude+ '&key=AIzaSyDg6py7cZHPkgOHPZ3TdbTC5s6dB70_D9I';
		Http.open('POST', url);
		Http.send();
		Http.onload = function() {
			const datajson=Http.responseText;
			var decoded_data=JSON.parse(datajson);
			numero=decoded_data['results'][0]['address_components'][0]['long_name'];
			calle=decoded_data['results'][0]['address_components'][1]['long_name'];
			colonia=decoded_data['results'][0]['address_components'][2]['long_name'];
			general=decoded_data['results'][0]['formatted_address'];
			municipio=decoded_data['results'][0]['address_components'][3]['long_name'];
			estado=decoded_data['results'][0]['address_components'][4]['long_name'];			
			//cp=decoded_data['results'][0]['address_components'][6]['long_name'];
			//alert(cp);
			place_id=decoded_data['results'][0]['place_id'];							
			document.getElementById("adicional_general").value=general; 			
			document.getElementById("adicional_calle").value=calle; 
			document.getElementById("adicional_numero").value=numero; 
			document.getElementById("adicional_colonia").value=colonia; 
			document.getElementById("adicional_municipio").value=municipio;
			//document.getElementById("adicional_cp").value=cp; 																
			document.getElementById("adicional_estado").value=estado; 
			var idpush=document.getElementById("idusuario").value;
			var idalerta=document.getElementById("idalerta").value;		
			
			var descripcionAlert=document.getElementById("descripcion").value;																
			//alert(place_id);
			var message="Se ha registrado una alerta con codigo: "+idalerta+" ubicada en :"+general+" Tipo de alerta: "+descripcionAlert;
			//alert(place_id);
			$.ajax({
  			method: "POST",
  			url: "session.php",
  			data: { text: general,
					calle: calle,
					numero: numero,
					colonia: colonia,
					municipio: municipio,
					idpush: idpush,
					identidadDes: descripcionAlert,
					idalerta:idalerta,
					message:message,
			}
				})
  			.done(function( response ) {
    		$("p.broken").html(response);
  			});
        
		}

		
		}					
	

	function initMap(){
		var latitude = document.getElementById('latitud').value;
		var longitude = document.getElementById('longitud').value;
		latitude=parseFloat(latitude);
		longitude=parseFloat(longitude);		
		var coordenadas = {lat:latitude, lng:longitude };
		var mapa= new google.maps.Map(document.getElementById('map'),{zoom:17, center:coordenadas});
  		var marker = new google.maps.Marker({position: coordenadas, map:mapa});	
		var popup = new google.maps.InfoWindow({content: 'Ubicacion de la alerta'});
		popup.open(map, marker);	 
		solicitud(); 
		}

	function showInfo() {
    	mapa.setZoom(16); //aumenta el zoom
    	mapa.setCenter(marker.getPosition());
		var contentString = 'Ubicación Actual';
    	var infowindow = new google.maps.InfoWindow({
    	content: 'Aqui es donde estudio, lee mas información en: '});
 		infowindow.open(mapa,marker);
		}
	 
		//Dispara accion al dar un clic en el marcador		
	//	google.map.event.addListener(marker, 'click', showInfo);
	</script> 	        			
	<style>
		body {
			background-color: #ffffff;
			}
  	</style>	
   
    <div id="encabezado">DETALLE DE ALERTA</div>
       <div id="masterPrincipal">
			<form id="masterFormDetalleAlerta" name="masterFormDetalleAlerta" action="../Controller/controller_alerta.php" >			
				<p hidden class="broken"></p>
				<div id="masterbotones">
				<svg class="bi bi-alert-triangle text-success" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"></svg>
				<abbr title="ATRAS">
					<button type="button" class="btn btn-default" aria-label="Left Align" onclick="retornarPagina()" >
  					<span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
					</button>
				</abbr>
				<abbr title="IMPRIMIR">
					<a target="_blank"  href='../Controller/controller_alerta.php?action=pdf&idalerta=<?php echo $_GET['idalerta']?>'; class="btn btn-default" aria-label="Left Align">
  					<span class="glyphicon glyphicon-print" aria-hidden="true" target="_blank"></span>
					</a>
				</abbr>
			
				
				</div>
		<br> 
			<?php $controller= new AlertaController();
			$CLAVE_USUARIO;
			foreach($controller->DetalleAlerta($_GET['idalerta']) as $alm ): 	
				$_SESSION['idalerta']=$alm->ID_ALERTA;
				$CLAVE_USUARIO=$alm->CLAVE_USUARIO;
				?>
					
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
							<label>CLAVE DE ALERTA
							<a class="glyphicon glyphicon-warning-sign" style="color:black;"></a>
							</label>
							<input type="text" disabled name="idalerta" id="idalerta" value="<?php echo $alm->ID_ALERTA; ?>" class="form-control" placeholder="clave de alerta"/>
							</div>
						<div class="form-group">
							<label>FECHA</label>
							<a class="glyphicon glyphicon-calendar" style="color:black;"></a>
							<input type="text" name="fecha" id="fecha" disabled value="<?php echo $alm->FECHA; ?>" class="form-control" placeholder="fecha"  />
						</div>  
						<div class="form-group">
							<label>CLAVE DE USUARIO
							<i class="fas fa-address-card"></i>
						</label>
		<input type="text" name="idusuario" id="idusuario" disabled value="<?php echo $alm->CLAVE_USUARIO; ?>" class="form-control" placeholder="clave de usuario"  />
						</div>
						<div class="form-group">
							<label>NOMBRE
							<a class="glyphicon glyphicon-user" style="color:black;"></a>
							</label>
							<input type="text" name="nombre" id="nombre" disabled value="<?php echo $alm->NOMBRE; ?>" class="form-control" placeholder="nombre"  />
						</div>
						<div class="form-group">
							<label>DESCRIPCION
							<i class="fas fa-info-circle"></i>
							</label>
							<input type="text" name="descripcion" id="descripcion" disabled value="<?php echo $alm->DESCRIPCION; ?>" class="form-control" placeholder="descripcion"  />
						</div>
						<div class="form-group">
							<label>UBICACION
							<i class="fas fa-location-arrow"></i>
							</label>
							<input type="text"   id="ubicacion" disabled name="ubicacion" value="<?php echo $alm->LONGITUD. " ".$alm->LATITUD; ?>"  class="form-control" placeholder="longitud"  />
						</div>
						<div class="form-group">
							<input hidden type="text" id="latitud" disabled name="latitud" value="<?php echo $alm->LATITUD; ?>" class="form-control" placeholder="latitud"  />
							<input hidden type="text" id="longitud" disabled name="longitud" value="<?php echo $alm->LONGITUD; ?>" class="form-control" placeholder="latitud"  />
						</div>
						</div>
						<div class="col-md-6"><br>
						<div id="map" style="height:400px; width: 600px;"> MAPA </div>
						</div>
					</div>	
			   <?php   
			   endforeach ?> 
				
					<div id="divoculto" > 
						<div id="encabezado">DETALLES ADICIONALES</div><br>
							<div class="form-group">
							<label>DOMICILIO GENERAL
							<i class="fas fa-map-marked-alt"></i>
							</label>
							
							<input type="text" disabled  id="adicional_general" class="form-control" placeholder=""/>
							</div>
							
							<div class="row">					
								<div class="col-md-6">
									<div class="form-group">
									<label>CALLE
									<i class="fas fa-road"></i>
									</label>
									<input type="text" disabled name="adicional_calle" id="adicional_calle" class="form-control" placeholder="#"/>
									</div>
								</div>					
								<div class="col-md-6">
									<div class="form-group">
										<label>NUMERO
										<i class="fas fa-map-marked-alt"></i>
										</label>
										<input type="text" disabled name="adicional_numero" id="adicional_numero" class="form-control" placeholder="#"/>
									</div>
								</div>
							</div>
							<div class="row">					
								<div class="col-md-6">
									<div class="form-group">
										<label>COLONIA
										<i class="fas fa-building"></i>
										</label>
										<input type="text" disabled name="adicional_colonia" id="adicional_colonia" class="form-control" placeholder="#"/>
									</div>
								</div>					
								<div class="col-md-6">
									<div class="form-group">
										<label>CIUDAD
										<i class="fas fa-city"></i>
										</label>
										<input type="text" disabled name="adicional_municipio" id="adicional_municipio" class="form-control" placeholder="#"/>
									</div>
								</div>
								<div class="row">					
								<div class="col-md-6">
									<div class="form-group">
										<label>CP
										<i class="fas fa-table"></i>
										</label>
										<input type="text" disabled name="adicional_cp" id="adicional_cp" class="form-control" placeholder="#"/>
									</div>
								</div>					
								<div class="col-md-6">
									<div class="form-group">
										<label>ESTADO
										<i class="fas fa-map-marked-alt"> </i>
										</label>
										<input type="text" disabled name="adicional_estado" id="adicional_estado" class="form-control" placeholder="#"/>
									</div>
								</div>

    
								<div id="encabezado">VERIFICAMIENTO DE ALERTAS</div>
								<div>
								<div class="col-md-6"><br>
								<div class="row">											
									<div  style="text-align: center;">	
										<p class="parrafoUsuarios"  >DATOS DEL LIDER</p>						
							<?php
										$controller= new AlertaController();	
										foreach($controller->MostrarLiderAlerta($CLAVE_USUARIO) as $alm ): 	?>
											<div class="row">
		
              		<div class="form-group">
        			  
					  <br><br> <label>CLAVE DE USUARIO
					  <i class="fas fa-id-card"></i>
					  </label>
			    	  <input type="text" disabled name="idusuarios" value="<?php echo $alm->CLAVE_USUARIO; ?>" class="form-control" placeholder="clave de usuario"/>
    				</div>

		<div class="form-group">
        		  <label>NOMBRE
				  <i class="fas fa-user"></i>
				  </label>
			      <input type="text" name="nombre" value="<?php echo $alm->NOMBRE; ?>" class="form-control" placeholder="nombre"  />
    			</div>              	
		      	<div class="form-group">
        		  <label>TELEFONO
				  <i class="fas fa-phone"></i>
				  </label>
			      <input type="text" name="telefono" value="<?php echo $alm->TELEFONO; ?>" class="form-control" placeholder="telefono"  />
    			</div>
    			<div class="form-group">
        		  <label>CORREO
				  <i class="fas fa-envelope-open-text"></i>
				  </label>
			      <input type="text" name="correo" value="<?php echo $alm->CORREO; ?>" class="form-control" placeholder="correo"  />
    			</div>
    			<div class="form-group">
        		  <label>CALLE
				  <i class="fas fa-map-marked-alt"></i>
				  </label>
			      <input type="text" name="calle" value="<?php echo $alm->CALLE; ?>" class="form-control" placeholder="calle"  />
    			</div></div>
				<div class="form-group">
        		  <label>NUMERO
				  <i class="fas fa-map-marked-alt"></i>
				  </label>
			      <input type="text" name="latitud" value="<?php echo $alm->NUMERO; ?>" class="form-control" placeholder="numero"  />
    			</div>
								</div>								
							</div>								
										<?php endforeach;?>
									</div>

										
									<div class="col-md-6"><br>
									
							<div class="row">											
									<div style="text-align: center;">							
							<?php
										$controller= new AlertaController();	
										
										foreach($controller->MostrarUsuarioAlerta($CLAVE_USUARIO) as $alm ): 	?>
											<div class="row">
											<p class="parrafoUsuarios"  >DATOS DEL USUARIO</p>						
              		<div class="form-group">
					  <br><br>
        			  <label>CLAVE DE USUARIO
					  <i class="fas fa-id-card"></i>
					  </label>
			    	  <input type="text" disabled name="idusuarios" value="<?php echo $alm->CLAVE_USUARIO; ?>" class="form-control" placeholder="clave de usuario"/>
    				</div>

		<div class="form-group">
        		  <label>NOMBRE
				  <i class="fas fa-user"></i>
				  </label>
			      <input type="text" name="nombre" value="<?php echo $alm->NOMBRE; ?>" class="form-control" placeholder="nombre"  />
    			</div>              	
		      	<div class="form-group">
        		  <label>TELEFONO
				  <i class="fas fa-phone"></i>
				  </label>
			      <input type="text" name="telefono" value="<?php echo $alm->TELEFONO; ?>" class="form-control" placeholder="telefono"  />
    			</div>
    			<div class="form-group">
        		  <label>CORREO
				  <i class="fas fa-envelope-open-text"></i>
				  </label>
			      <input type="text" name="correo" value="<?php echo $alm->CORREO; ?>" class="form-control" placeholder="correo"  />
    			</div>
    			<div class="form-group">
        		  <label>CALLE
				  <i class="fas fa-map-marked-alt"></i>
				  </label>
			      <input type="text" name="calle" value="<?php echo $alm->CALLE; ?>" class="form-control" placeholder="calle"  />
    			</div></div>
				<div class="form-group">
        		  <label>NUMERO
				  <i class="fas fa-map-marked-alt"></i>
				  </label>
			      <input type="text" name="latitud" value="<?php echo $alm->NUMERO; ?>" class="form-control" placeholder="numero"  />
    			</div>

								</div>								
								
							</div>								
							
										<?php endforeach;?><br>
										
									</div>
									
									<div style="text-align: center;">        
									<p class="parrafoNotas">NOTA ANTES DE CONFIRMAR COMUNICATE CON EL LIDER, ENCARGADO O EL USUARIO PARA DESCARTAR UNA FALTA ALARMA</p>
									<button id="miBoton" style="height: auto; width: auto; font-size:x-large; background-color:#004aad; color:white;" type="button" onclick="alerta();" aria-label="Left Align">CONFIRMAR
									<span class="glyphicon glyphicon-ok" aria-hidden="true" ></span></button>
							</div><br><br>
									</div>		<div id="divseguimiento">
									<div id="encabezado">SEGUIMIENTO DE ALERTAS</div>
								
								<?php 	
										include 'select.php';?></div>	
							</div>
						</div>
					</div> 					
			</form>
		</div> 					
	</div>	

	

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDg6py7cZHPkgOHPZ3TdbTC5s6dB70_D9I&callback=initMap"async defer></script>
















<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNZiGWCPZaKGTaETuLH-SSxh8A_wzX32Y&callback=initMap"></script>








<script>
                function initMap() {
                    var uluru = {lat: 20.072552936320644, lng: -98.3917965};
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 50,
                        center: uluru
                    });
                    var marker = new google.maps.Marker({
                        position: uluru,
                        map: map,
                        title: 'La Bandida'
                    });
                }
        </script>






function ubicacion_google_maps() {
                var geocoder = new google.maps.Geocoder();
                var address = "Carretera mexico tuxpan, San Francisco, Plaza, 43704 Tulancingo de Bravo, Hgo.";
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                        var myLatlng = new google.maps.LatLng(latitude,longitude);
                        var mapOptions = {
                            zoom: 15,
                            center: myLatlng
                        }
                        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: 'Hello World!'
                        });
                    } 
                }); 
            }




			<style type="text/css">
                /*responsive design*/
                
            </style>
            <script>
                function initMap() {
                    var uluru = {lat: 20.072552936320644, lng: -98.3917965};
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 50,
                        center: uluru
                    });
                    var marker = new google.maps.Marker({
                        position: uluru,
                        map: map,
                        title: 'La Bandida'
                    });
                }
        </script>
