import { BikesDisplay } from './bikesDisplay';
import 'bootstrap/dist/css/bootstrap.css';
import { DataSource } from './data/remoteDataSource';
import { Display } from './display';
import { ServiceListDisplay } from './serviceListDisplay';
import { DISPLAY_MODE } from './data/enums/displayMode';

function refreshRootElement(elem) {
  let rootElement = document.getElementById('app');
  rootElement.innerHTML = '';
  rootElement.appendChild(elem);
}

let ds = new DataSource();
let mode = DISPLAY_MODE.BIKES;

const changeDisplayMode = async (updatedMode: DISPLAY_MODE) => {
  mode = updatedMode;
  await displayData().then(refreshRootElement)
}

async function displayData(): Promise<HTMLElement> {
  let display: Display;
  if (mode === DISPLAY_MODE.BIKES) {
    display = new BikesDisplay();
  } else if (mode === DISPLAY_MODE.SERVICE_LIST) {
    display = new ServiceListDisplay();
  } else {
    display = new BikesDisplay();
  }
  display.props = {
    dataSource: ds,
    changeDisplayMode: changeDisplayMode
  }
  return display.getContent();
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    displayData().then(refreshRootElement);
  }
};

