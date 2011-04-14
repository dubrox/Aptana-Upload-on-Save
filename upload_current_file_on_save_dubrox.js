/*
 * Listener: commandService().addExecutionListener(this);
 * Menu: Synchronize > Upload Current File On Save (dubrox)
 * Kudos: Ingo Muschenetz & dubrox
 * License: EPL 1.0
 * DOM: http://localhost/com.aptana.ide.syncing.doms
 * DOM: http://download.eclipse.org/technology/dash/update/org.eclipse.eclipsemonkey.lang.javascript
 */

/**
 * Returns a reference to the workspace command service
 */
function commandService() {
	var commandServiceClass = Packages.org.eclipse.ui.commands.ICommandService;
	
	// same as doing ICommandService.class
    var commandService = Packages.org.eclipse.ui.PlatformUI.getWorkbench().getAdapter(commandServiceClass);
    return commandService;
}

/**
 * Called before any/every command is executed, so we must filter on command ID
 */
function preExecute(commandId, event) {}

/* Add in all methods required by the interface, even if they are unused */
function postExecuteSuccess(commandId, returnValue) {
	
	// if we see a save command
	if (commandId == "org.eclipse.ui.file.save" && upload_current_file_on_save_dubrox == true) { // added by dubrox
		sync.uploadCurrentEditor();
		
		/* Replace above line if you'd like to limit it to just certain projects
		var fileName = editors.activeEditor.uri;
		if(fileName.match(/projectName/ig))
		{
			sync.uploadCurrentEditor();	
		}
		*/
    }
}

function notHandled(commandId, exception) {}

function postExecuteFailure(commandId, exception) {}

/**
 * Added by dubrox
 */
var upload_current_file_on_save_dubrox = false;
function main() {
	if (confirm('Do you want to ' + ((!upload_current_file_on_save_dubrox) ? 'ENABLE' : 'DISABLE') + ' auto-upload?')) {
		upload_current_file_on_save_dubrox = !upload_current_file_on_save_dubrox;
		alert('Auto-upload ' + ((upload_current_file_on_save_dubrox) ? 'enabled' : 'disabled'));
	}
}