let serie = $state('');

export function getSerie() {
	
	function setSerie(s) {
		serie = s
	}

	return {
		get serie() {
			return serie;
		},
		setSerie,
	};
}