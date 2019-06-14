
$(".validaUsr").hide();

	$("input").keyup(function(){
		$(".error").hide();
	});

	
	
	
$(document).ready(function(){

	function validaForm(){
		
		var valida=true;
		
																		
		var nom = $('#nombre').val();
		var ap = $('#apellidos').val();
		var ce = $('#correo').val();
		var pass = $('#contrasena').val();

		
		if (nom == "") {
				$("#exp_nombre").show();
				$("#exp_nombre").html("* Ingresa el nombre.");
				$("#nombre").focus();
				valida=false;
		}
			

		if (ap == "") {
				$("#exp_ap").show();
				$("#exp_ap").html("* Ingresa los apellidos.");
				$("#apellidos").focus();
				valida=false;
		}
			

		if (  ( ce == "" )||( isValidEmailAddress(ce) == false) ){
				$("#exp_correo").show();
				$("#exp_correo").html("* Ingresa un correo electrónico válido.");
				$("#correo").focus();
				valida=false;
		}
	
	
		if (pass == "") {
				$("#exp_clave").show();
				$("#exp_clave").html("* Ingresa la contraseña.");
				$("#contrasena").focus();
				valida=false;
		}
																		
		return valida;	
				
	}


	
			
		
		//console.log("cookieValida");
		
		
		$(".inpTxt label").css("top", "-10px");
		
		$("#nombre").val();
		$("#apellidos").val();
		$("#correo").val();
	
		
		
		var usuario = "";
		var password = "";
		
		var flag = "";
		
		$("#btnValida").click(function(){
			
			validaForm();
			
			
			if(validaForm() == false){
				//console.log("false");
			}else{
				usuario = $("#correo").val();
				password = $("#contrasena").val();
				
				var url ='http://10.105.124.2:8080/validaUsuario';
				var valores =  JSON.stringify( {"idSistema":"1","telefono":tel,"usuario":usuario,"password":password});
							
				jQuery.ajax({
					data:  valores,
					url:   url,
					type:  'post',
					dataType: "json",
					timeout: 60000,
					contentType: "application/json",
					beforeSend: function () {
						fnv3_Flujo_Form_submit_msg_working( true );
						$(".validaUsr").hide();
						$("#txtDisponible").hide();
					},
					success:  function (response) {
						fnv3_Flujo_Form_submit_msg_working( false );
						console.log(JSON.stringify(response));
						
						if(response.codigoRespuesta == 00){
							
							$("#btnConfirma").show('slow');
							$("#txtDisponible").show();
							flag = true;
							$("#disponible").show();
						}else if(response.codigoRespuesta == 30 || response.codigoRespuesta == 40){
							flag = false;
							$("#noDisponible").show();
						}else if(response.codigoRespuesta == 02){
							$("#validaError").html(response.mensajeUsr);
							$("#validaError").show();
							flag = false;
						}else{
							$("#validaError").html("No es posible validar el usuario, intente mas tarde");
							$("#validaError").show();
							flag = false;
						}
						
						
					},
					error: function(response){
						fnv3_Flujo_Form_submit_msg_working( false );
						//console.log(JSON.stringify(response));
					}
				});
				
				
			}
			
		});
		
		$("#btnConfirma").click(function(){
			
			
			nom = $('#nombre').val();
			ap = $('#apellidos').val(); 
			usuario = $("#correo").val();
			password = $("#contrasena").val();
		
			if(validaForm() == false || flag == false){
				//console.log("false");
			}else if(validaForm() == true || flag == true){
					
				
				var url ='http://10.105.124.2:8080/guardaUsuario';
				
				var valores =  JSON.stringify({"telefono":tel,"email":cor,"nombre":nom,"apellido":ap,"correo":usuario,"password":password});
				
						
				jQuery.ajax({
					data:  valores,
					url:   url,
					type:  'post',
					dataType: "json",
					contentType: "application/json",
					beforeSend: function () {
						fnv3_Flujo_Form_submit_msg_working( true );
					},
					success:  function (response) {
						
						console.log(JSON.stringify(response));
						
						if(response.codigoRespuesta == 00 || response.codigoRespuesta == 01){
							
							if(response.claroDriveResponse.codigoRespuesta == 00 || response.claroDriveResponse.codigoRespuesta == 01){
								window.location.href = "/exito";
							}else{
								window.location.href = "/error?c="+response.codigoRespuesta;
							}
						}else{
							window.location.href = "/error?guardaUsr="+response.codigoRespuesta;
						}
						
						
						
					},
					error: function(response){
						fnv3_Flujo_Form_submit_msg_working( false );
						//console.log(JSON.stringify(response));
						window.location.href = "/error?c=timeout";
					}
				});
				
				
				
			}
			
		});
		
	
	
});
