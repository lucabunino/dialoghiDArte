let editor = $state('');

export function getEditor() {
	
	function setEditor(e) {
		editor = e
	}

	return {
		get editor() {
			return editor;
		},
		setEditor,
	};
}