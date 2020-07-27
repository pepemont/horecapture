
var lebouton = null;
//Créé un objet Cryptography.
crypt = app.CreateCrypt();
var motdepasse = "";
MD5motdepasse = "";


//Called when application is started.
function OnStart()
{
    
    //Créer ou ouvre une basse de données appelée "Horecapture".
    db = app.OpenDatabase( "Horecapture" );  
      
	//Créer une table (si elle n'existe pas déjà).
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS donnees " +  
        "(id integer primary key, d1 text, d2 text, d3 text, d4 text, d5)" );  
    
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS motdepasse " +  
        "(d1 text)" );  
    db.ExecuteSql( "DELETE FROM motdepasse" );
   
    //db.ExecuteSql( "DELETE FROM donnees" );  
    
   
    
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );
	lay.SetBackColor( "white" );
//	CreateTheme();

	//Create a text label and add it to layout.
	txt = app.CreateText( "Bienvenue\ndans notre\nétablissement",1,0.3,"Multiline" );
	txt.SetTextSize( 32 );
	txt.SetTextColor( "#000000" );
	lay.AddChild( txt );
	
	b1 = app.CreateButton( "Remplir une fiche 'client'", 0.7 );
    b1.SetOnTouch( btn_OnTouch );
    lay.AddChild( b1 );
    
    
    
    txt2 = app.CreateText( "\nVos coordonnées seront conservées 14 jours, afin de pouvoir vous prévenir si vous avez été en contact au sein de notre établissement avec une personne testée positive au COVID-19.\nElles seront ensuite supprimées de notre base de données, conformément aux directives du Conseil National de Sécurité \nMerci de votre compréhension !",0.8,0.2, "Multiline" );
	txt2.SetTextSize( 10 );
	txt2.SetTextColor( "#000000" );
    txt2.SetPadding(0,1,0.3,0.1,0.1);
	lay.AddChild( txt2 );
	
	
    b2 = app.CreateButton( "Informations légales",  0.7, -1, "Gray" );
    b2.SetOnTouch( btnLegal_OnTouch );
    lay.AddChild( b2 );

  
	//Create a layout we can slide over the main layout.
	//(This hidden layout is actually on top of the main
	//layout, it just appears to slide from the left)
	laySlide = app.CreateLayout( "Linear", "Left,FillXY" );
	laySlide.SetPadding( 0.1, 0.05, 0, 0 ); 
	laySlide.SetBackColor( "lightgray" );
	laySlide.SetVisibility( "Hide" );
	
	
    //Create some text.
    txt = app.CreateText( "Date de votre visite :" );
        txt.SetTextSize( 12);
        txt.SetTextColor( "#000000" );
    laySlide.AddChild( txt );
    
    //Create an text edit box.
    edt = app.CreateTextEdit("",0.7);
    edt.SetEnabled(false);
    laySlide.AddChild( edt );
	
	//Create some text.
    txt2 = app.CreateText( "Numéro de table :" );
    txt2.SetTextSize( 12);
      txt2.SetTextColor( "#000000" );
    laySlide.AddChild( txt2 );
    
    //Create an text edit box.
    edt2 = app.CreateTextEdit( "",0.7,-1,"numbers");
      edt2.SetTextColor( "#000000" );
    laySlide.AddChild( edt2 );
    
        //Create some text.
    txt3 = app.CreateText( "Durée de séjour (le cas échéant) :" );
    txt3.SetTextSize( 12);
      txt3.SetTextColor( "#000000" );
      txt3.SetTextColor( "#000000" );
    laySlide.AddChild( txt3 );
    
    //Create an text edit box.
    edt3 = app.CreateTextEdit( "",0.7);
    edt3.SetTextColor( "#000000" );
    laySlide.AddChild( edt3 );
    
        //Create some text.
    txt4 = app.CreateText( "Nom & Prénom (recommandé) :" );
    txt4.SetTextSize( 12);
    txt4.SetTextColor( "#000000" );
    laySlide.AddChild( txt4 );
    
    //Create an text edit box.
    edt4 = app.CreateTextEdit( "",0.7);
    edt4.SetTextColor( "#000000" );
    laySlide.AddChild( edt4 );
	
	//Create some text.
    txt5 = app.CreateText( "Téléphone ou courriel (obligatoire) :" );
    txt5.SetTextSize( 12);
    txt5.SetTextColor( "#000000" );
    laySlide.AddChild( txt5 );
    
    //Create an text edit box.
    edt5 = app.CreateTextEdit( "",0.7);
    edt5.SetTextColor( "#000000" );
    laySlide.AddChild( edt5 );
	
	//Create a check box.
    chk = app.CreateCheckBox( "J’accepte le traitement des données décrit dans l’article 6 du RGPD c) et l’arrêté ministériel pertinent.",-1,-1,"dark" );
    chk.SetMargins( 0, 0.02, 0, 0 );
    chk.SetTextSize( 12);
    chk.SetTextColor( "#000000" );
    chk.SetOnTouch( chk_OnTouch);
    laySlide.AddChild( chk );
	
	//Create button and add to sliding layout.
	btnBack = app.CreateButton( "Enregistrer ces données", 0.5, 0.06, "gray" );
	lebouton=btnBack;
	btnBack.SetOnTouch( btnBack_OnTouch );
	btnBack.SetEnabled(false);
	laySlide.AddChild( btnBack );
	
//=========INFORMATIONS LEGALES =============	
//===========================================
		//Create a layout we can slide over the main layout.
	//(This hidden layout is actually on top of the main
	//layout, it just appears to slide from the left)
	layLegal = app.CreateLayout( "Linear", "Center,FillXY" );

	layLegal.SetBackColor( "white" );
	layLegal.SetVisibility( "Hide" );
	
	
    //Create some text.
    txt30 = app.CreateText( "Informations légales ",-1,-1 );
   txt30.SetTextSize( 14);
     txt30.SetPadding(0,0.1,0,0);
   txt30.SetTextColor ("blue");
    layLegal.AddChild( txt30 );
    
 txt2 = app.CreateText( 	"\nPourquoi nous laisser vos données ?",0.8,-1,"Multiline" );
	txt2.SetTextSize( 12 );
	txt2.SetTextColor( "#000000" );
   // txt2.SetPadding(0,1,0.1,0.1,0.1);
	layLegal.AddChild( txt2 );
	
	
txt2 = app.CreateText( "Le 23 juillet 2020, le Conseil National de Sécurité a annoncé que les établissements du secteur" +
" Horeca sont obligés de tenir un registre de leurs clients. Cette décision n’a pas été prise sans" +
" réflexion. Comme le virus est toujours là, de nouvelles mesures, y-compris celle-ci, ont été prises" +
" afin de de garantir autant que possible votre propre santé, mais aussi celle de votre famille, de" +
" vos amis, de vos connaissances. Votre santé est une priorité !\n",0.8,-1, "Multiline" );
	txt2.SetTextSize( 10 );
	txt2.SetTextColor( "#000000" );
    txt2.SetPadding(0,1,0.1,0,0);
	layLegal.AddChild( txt2 );
	
	 txt2 = app.CreateText( 	"Que ferons-nous avec vos données ?",0.8,-1 );
	txt2.SetTextSize( 12 );
	txt2.SetTextColor( "#000000" );
   // txt2.SetPadding(0,1,0.1,0.1,0.1);
	layLegal.AddChild( txt2 );

txt2 = app.CreateText( "Nous comprenons que la nouvelle mesure soulève la question de la protection des données." +
" Nous les traiterons de la part de l’AViQ. Pendant 14 jours nous tiendrons vos données dans" + 
" une base de donnée protégée par mot de passe. Après cette période, ces données seront effacées définitivement. Ce n’est" +
" que dans le cas d’une contamination que les données seront communiquées aux autorités" +
" compétentes. En aucun cas vos données ne seront utilisées à des fins de marketing ou autres que le" +
" traçage des contacts dans le cadre du COVID-19.\n",0.8,-1, "Multiline" );
	txt2.SetTextSize( 10 );
	txt2.SetTextColor( "#000000" );
    txt2.SetPadding(0,1,0.1,0,0);
	layLegal.AddChild( txt2 );
	
		 txt2 = app.CreateText( "Avez-vous des questions ?",0.8,-1 );
	txt2.SetTextSize( 12 );
	txt2.SetTextColor( "#000000" );
   // txt2.SetPadding(0,1,0.1,0.1,0.1);
	layLegal.AddChild( txt2 );

txt2 = app.CreateText( "En cas de questions, nous vous prions de vous diriger vers le responsable du restaurant, du café" +
" ou de l’hôtel.\n",0.8,-1, "Multiline" );
	txt2.SetTextSize( 10 );
	txt2.SetTextColor( "#000000" );
    txt2.SetPadding(0,1,0.1,0,0);
	layLegal.AddChild( txt2 );

		 txt2 = app.CreateText( "L’aspect juridique: sur quelle base vos données seront-elles traitées ?",0.8,-1, "Multiline" );
	txt2.SetTextSize( 12 );
	txt2.SetTextColor( "#000000" );
   // txt2.SetPadding(0,1,0.1,0.1,0.1);
	layLegal.AddChild( txt2 );	
	
txt2 = app.CreateText(	"Vous avez sans aucune doute déjà entendu parlé du ‘RGPD’ (règlement général sur la protection des données)." +
" C’est la nouvelle règlementation européenne qui renforce la protection de vos données personnelles. Nous" +
" traiterons vos données par ordre des autorités, conformément aux directives du Conseil National de Sécurité" +
" et au titre de l’article 6,c (le traitement nécessaire au respect d’une obligation légale à laquelle le responsable" +
" du traitement est soumis) et l’article 3, 10°Arrêté ministériel du 24 juillet 2020 modifiant l’arrêté ministériel" +
" du 30 juin 2020 portant des mesures d’urgence pour limiter la propagation du coronavirus COVID-19. Si vous" +
" avez des questions concernant le traitement de vos données, ou si vous souhaitez introduire une demande ou" +
" une plainte, vous pouvez contacter le DPO de l’AViQ sur l’adresse DPO@aviq.be.\n",0.8,-1, "Multiline" );
	txt2.SetTextSize( 10 );
	txt2.SetTextColor( "#000000" );
   // txt2.SetPadding(0,1,0.1,0,0);
	layLegal.AddChild( txt2 );
	
	//Create button and add to sliding layout.
	btnBack = app.CreateButton( "Ok", 0.5, -1, "gray" );
	btnBack.SetOnTouch( btnOk_OnTouch );
	layLegal.AddChild( btnBack );
	
//=========tiroir de configuration=============	
	
	layDrawer = app.CreateLayout( "Linear", "FillXY,VCenter" );
    layDrawer.SetBackColor( "lightgray" );
  

    txt2 = app.CreateText( "Gestion des données\n\n", -1,-1, "Multiline" );
    txt2.SetTextSize( 20 );
    	txt2.SetTextColor( "#000000" );
    layDrawer.AddChild( txt2 );
    
    //Create button 
	btnGestClean = app.CreateButton( "Effacer", 0.5, 0.06, "gray" );
	btnGestClean.SetOnTouch( btnGestClean_OnTouch );
	layDrawer.AddChild( btnGestClean );
    
    txt2 = app.CreateText( "" );
    txt2.SetTextSize( 20 );
    layDrawer.AddChild( txt2 );
    
    //Create button 
	btnGestExp = app.CreateButton( "Exporter", 0.5, 0.06, "gray" );
	btnGestExp.SetOnTouch( btnGestExp_OnTouch );
	layDrawer.AddChild( btnGestExp );

   
	
	//Add layout to app.	
	app.AddLayout( lay );
	app.AddLayout( laySlide );
	app.AddLayout( layLegal);
	app.AddDrawer( layDrawer, "left", 0.75 );
	 GererMotDePasse();
}







//Called when user touches our slide button.
function btn_OnTouch()
{
    var t=new Date();
    //var t=new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)  
    dateheureFR = t.getDate()+'/'+(t.getMonth()+1)+'/'+t.getFullYear()+' ' +t.getHours()+':'+t.getMinutes();
    dateheure = t.toISOString();
  
    edt.SetText(dateheureFR);
	edt2.SetText("");
	
	edt2.Focus();
	app.ShowKeyboard(edt2);
	edt3.SetText("");
	edt4.SetText("");
	edt5.SetText("");
	chk.SetChecked(false);
	lebouton.SetEnabled(false);
	laySlide.Animate( "SlideFromRight" );
}

//Called when user touches our slide button.
function btnLegal_OnTouch()
{
	//DisplayAllRows();
	layLegal.Animate( "SlideFromLeft" );
}


//Called when user touches our back button.
function btnBack_OnTouch()
{
	app.HideKeyboard();
	ynd = app.CreateYesNoDialog( "Enregistrer ces données ?\n\nDate : "+dateheureFR+"\nTable : "+edt2.GetText()+"\nDurée : "+edt3.GetText()+"\nNom : "+edt4.GetText()+"\nTél. ou mail : "+edt5.GetText()+"\n" );
    ynd.SetOnTouch( btnBackYes_OnTouch );
    ynd.SetButtonText("Oui","Non");
    ynd.Show();
	
	
	
}


//Called when user touches our back button.
function btnBackYes_OnTouch(result)
{
    if (result == "Yes") {
	app.HideKeyboard();
	app.ShowPopup("Données sauvegardées");
	EcrireDonnees();
	laySlide.Animate( "SlideToRight" );	
	} ;
	
}


//Called when user touches our back button.
function btnOk_OnTouch()
{
	layLegal.Animate( "SlideToLeft" );	
}


//Called when user touches our Clean button.
function btnGestClean_OnTouch()
{

{
ynd = app.CreateYesNoDialog( "Effacer les données \nd'il y a plus de 15 jours ?" );
ynd.SetOnTouch( OnClean );
ynd.SetButtonText("Oui","Non");
ynd.Show();
}
}

function OnClean(result)
{
if (result=="Yes") 		app.ShowTextDialog("Mot de passe ?", "", OnClean2);
	
}


function OnClean2(mdp)
{
if (mdp == motdepasse){
    var t=new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) ;
	m=t.toISOString().split('T');
	db.ExecuteSql( "delete from donnees WHERE strftime('%Y-%m-%d', d1) < '" +m+"' ;", [] );
	
	app.ShowPopup("Anciennes données effacées avant " + m[0]);	
};
}


//Called when user touches our Exp button.
function btnGestExp_OnTouch()
{
		app.ShowTextDialog("Mot de passe ?", "", OnExport);
		
}


function OnExport(mdp)
{
if (mdp == motdepasse){
		app.ShowPopup("Exportation en cours vers Horecapture.csv");
		 db.ExecuteSql( "select * from donnees;", [], OnResultExport ); 
};
}





//Called when user touches check box.
function chk_OnTouch( isChecked) 
{
    if (isChecked) {lebouton.SetEnabled(true);} 
    else 
    {lebouton.SetEnabled(false);};
}

//

function EcrireDonnees ()
{
       //Add some data (with error handler).  
    db.ExecuteSql( "INSERT INTO donnees (d1, d2, d3, d4, d5)" +   
        " VALUES (?,?,?,?,?)", [dateheure,edt2.GetText(),edt3.GetText(),crypt.Encrypt(edt4.GetText(),motdepasse),crypt.Encrypt(edt5.GetText(),motdepasse)], null, null );  

}


//function to display all records 
function DisplayAllRows() 
{ 
       //  txt30.SetText("");  
    //Get all the table rows.  
    db.ExecuteSql( "select * from donnees;", [], OnResult ); 
    // db.ExecuteSql( "select * from donnees WHERE strftime('%Y-%m-%d', d1) > '2020-07-24' ;", [], OnResult ); 
} 


//Callback to show query results in debug.  
function OnResult( results )   
{  
    var s = "";  
    var len = results.rows.length;  
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)  
        s += item.id + ", " + item.d1 +", " + item.d2 + ", " + item.d3 + ", " +crypt.Decrypt(item.d4,motdepasse) +", " + crypt.Decrypt(item.d5,motdepasse) + "\n";   
    }  
    txt30.SetText(s );  
    layLegal.Animate( "SlideFromLeft" );
}  

//Callback to show query results in debug.  
function OnResultExport( results )   
{  
    var s = "id,dateheure_gmt0,table,temps,nom,coord\n";  
    var len = results.rows.length;  
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)  
        s += item.id + ", " + item.d1 +", " + item.d2 + ", " + item.d3 + ", " +crypt.Decrypt(item.d4,motdepasse) +", " + crypt.Decrypt(item.d5,motdepasse) + "\n";   
    }  
     var dir = app.GetInternalFolder();
    app.WriteFile( dir+'/'+"Horecapture.csv", s );
    
}  

function GererMotDePasse()
{
    db.ExecuteSql( "select * from motdepasse;", [], OnResultMDP );   
}

function OnResultMDP(results)

{
    if (results.rows.length == 0 ) {CreerMotDePasse();} else
    {
        MD5motdepasse=results.rows.item(0).d1;
        IntroduireMotDePasse();
}
}

function CreerMotDePasse()
{
    
    //Create a layout with objects vertically centered.
	layMDP = app.CreateLayout( "linear", "Center,FillXY" );
	layMDP.SetBackColor( "lightgray" );
    layMDP.SetVisibility( "Hide" );


	//Create a text label and add it to layout.
	txt = app.CreateText(  "\nPremière utilisation.\n\nCréation du mot de passe.\n\n(Notez-le soigneusement !!!)\n\n",0.8,0.2,"Multiline" ) ;
	txt.SetTextSize( 16 );
	txt.SetTextColor( "#000000" );
	layMDP.AddChild( txt );
	
	//Create some text.
    txt5 = app.CreateText( "Choisir un mot de passe :" );
    txt5.SetTextSize( 12);
    	txt5.SetTextColor( "#000000" );
    layMDP.AddChild( txt5 );
    
	//Create an text edit box.
    edtmdp = app.CreateTextEdit( "",0.7,-1,"numbers");
    	edtmdp.SetTextColor( "#000000" );
    layMDP.AddChild( edtmdp );
    
    //Create some text.
    txt5 = app.CreateText( "Confirmer ci-dessous le mot de passe :" );
    txt5.SetTextSize( 12);
    	txt5.SetTextColor( "#000000" );
    layMDP.AddChild( txt5 );
    
     //Create an text edit box.
    edtmdp2 = app.CreateTextEdit( "",0.7,-1,"numbers");
    edtmdp2.SetTextColor( "#000000" );
    layMDP.AddChild( edtmdp2 );
	
    b2 = app.CreateButton( "Ok",  0.7, -1, "Gray" );
    b2.SetOnTouch( btnCreatePwd_OnTouch );
    layMDP.AddChild( b2 );
    app.AddLayout(layMDP);
    layMDP.Animate( "SlideFromRight" );
    edtmdp.Focus();
    app.ShowKeyboard(edtmdp);

 
}
//Called when user touches our Exp button.
function btnCreatePwd_OnTouch()
{
   
	if (edtmdp.GetText() == edtmdp2.GetText()) {SetPasswordInDb(edtmdp.GetText());}	
	else
	{app.ShowPopup("Les mots de passe ne correspondent pas !!!");	}
	 
}

function SetPasswordInDb(pass)
{
    motdepasse = pass;
    MD5motdepasse = crypt.Hash(pass, "MD5")
	db.ExecuteSql( "INSERT INTO motdepasse (d1) VALUES (?)", [MD5motdepasse], null, null );  
	layMDP.Animate( "SlideToRight" );
	app.HideKeyboard();
	app.ShowPopup(motdepasse);
		
}

function IntroduireMotDePasse()
{
    
    //Create a layout with objects vertically centered.
	layMDP = app.CreateLayout( "linear", "Center,FillXY" );
	layMDP.SetBackColor( "lightgray" );
    layMDP.SetVisibility( "Hide" );


	//Create a text label and add it to layout.
	txt = app.CreateText(  "\nBase de données cryptée. \nVeuillez introduire le mot de passe.",0.8,0.2,"Multiline" ) ;
	txt.SetTextSize( 16 );
	txt.SetTextColor( "#000000" );
	layMDP.AddChild( txt );
	
	//Create some text.
    txt5 = app.CreateText( "Mot de passe :" );
    txt5.SetTextSize( 12);
    	txt5.SetTextColor( "#000000" );
    layMDP.AddChild( txt5 );
    
	//Create an text edit box.
    edtmdp = app.CreateTextEdit( "",0.7,-1,"numbers");
    	edtmdp.SetTextColor( "#000000" );
    layMDP.AddChild( edtmdp );
    
   
	
    b2 = app.CreateButton( "Ok",  0.7, -1, "Gray" );
    b2.SetOnTouch( btnIntroPwd_OnTouch );
    layMDP.AddChild( b2 );
    app.AddLayout(layMDP);
    layMDP.Animate( "SlideFromRight" );
    edtmdp.Focus();
    app.ShowKeyboard(edtmdp);
 
}
//Called when user touches our Exp button.
function btnIntroPwd_OnTouch()
{
   
	if (crypt.Hash(edtmdp.GetText(),"MD5") == MD5motdepasse )
	{	motdepasse = edtmdp.GetText();
	     layMDP.Animate( "SlideToRight" );
	     app.HideKeyboard(edtmdp);
	}
	else
	{app.ShowPopup("Mot de passe incorrect !")};
	
	 
}

//Create a theme for all controls and dialogs.
function CreateTheme()
{
    theme = app.CreateTheme( "Light" );
    theme.AdjustColor( 35, 0, -10 );
    theme.SetBackColor( "#ffffffff" );
    theme.SetBtnTextColor( "#000000" );
    theme.SetButtonOptions( "custom" );
    theme.SetButtonStyle( "#fafafa","#fafafa",5,"#999999",0,1,"#ff9000" );
    theme.SetCheckBoxOptions( "dark" );
    theme.SetTextEditOptions( "underline" );
    theme.SetDialogColor( "#ffffffff" );
    theme.SetDialogBtnColor( "#ffeeeeee" );
    theme.SetDialogBtnTxtColor( "#ff666666" );
    theme.SetTitleHeight( 42 );
    theme.SetTitleColor( "#ff888888" ); 
    theme.SetTitleDividerColor( "#ff0099CC" );
    theme.SetTextColor( "#000000" );
    app.SetTheme( theme );
}
