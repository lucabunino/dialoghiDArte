let category = $state('');

export function getCategory() {
	
	function setCategory(c) {
		category = c
	}

	return {
		get category() {
			return category;
		},
		setCategory,
	};
}