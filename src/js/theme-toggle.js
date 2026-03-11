/*
* Dark mode toggle
*
* In its current state, it will cause a minor FOIT.
* Basically, the background behind the panels will
* briefly flash white before turning dark. It's
* better than before, but not perfect.
*/

/*
* localStorage will only store strings
* This means that if it has the value 'false',
* It will be truey and incorrectly cause the
* dark theme to load.
*/
var prefersDarkTheme = localStorage.getItem('darkTheme') || '';
var darkThemeButton = document.getElementById('dark-theme-toggle');
var prefersClassicTheme = localStorage.getItem('classicTheme');
var classicThemeButton = document.getElementById('classic-theme-toggle');
darkThemeButton.value = prefersDarkTheme;
classicThemeButton.value = prefersClassicTheme;
updateTheme();

function updateTheme() {
	var isDark = prefersDarkTheme ? prefersDarkTheme === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
	var isClassic = prefersClassicTheme ? prefersClassicTheme === 'true' : false;
	var mainStyles = document.getElementById('main-styles');
	var darkStyles = document.getElementById('dark-theme-styles');
	var classicStyles = document.getElementById('classic-styles');
	var classicDarkStyles = document.getElementById('classic-dark-styles');
	classicStyles.disabled = !isClassic;
	mainStyles.disabled = isClassic;
	classicDarkStyles.disabled = (!isDark || !isClassic);
	darkStyles.disabled = (!isDark || isClassic);
}

/*
* Function that toggles light and dark mode
* Doesn't use jQuery, probably could with some modification
*/
function toggleTheme() {
	prefersDarkTheme = document.getElementById('dark-theme-toggle').value;
	prefersClassicTheme = document.getElementById('classic-theme-toggle').value;
	updateTheme();

	localStorage.setItem('darkTheme', prefersDarkTheme);
	localStorage.setItem('classicTheme', prefersClassicTheme);
}

darkThemeButton.addEventListener('change', toggleTheme);
classicThemeButton.addEventListener('change', toggleTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
