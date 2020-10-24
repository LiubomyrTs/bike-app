import { HTMLDisplay } from './htmlDisplay';
import 'bootstrap/dist/css/bootstrap.css';
import { DataSource } from './data/remoteDataSource';

let ds = new DataSource();

async function displayData(): Promise<HTMLElement> {
  let display = new HTMLDisplay();
  display.props = {
    dataSource: ds
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
