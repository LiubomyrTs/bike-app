import { HTMLDisplay } from './htmlDisplay';
import 'bootstrap/dist/css/bootstrap.css';
import { loadBikes } from './data/remoteDataSource';

console.log('Bike app');

async function displayData(): Promise<HTMLElement> {
  const display = new HTMLDisplay();
  display.props = {
    bikes: (await loadBikes()).data
  }
  return display.getContent();
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    displayData().then(elem => {
      let rootElement = document.getElementById('app');
      rootElement.innerHTML = '';
      rootElement.appendChild(elem);
    });
  }
};
