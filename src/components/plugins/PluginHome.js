import React, {createContext} from 'react';

import PluginThumbDisplay from "./PluginThumbDisplay";
import repeaterImage from "../../media/plugins/repeater/Repeater.JPG";
import beatskillzSequelImage from "../../media/plugins/client/beatskillz-sequel.jpg";
import oceanElementsImage from "../../media/plugins/client/ocean-elements.jpg";
import scorchImage from "../../media/plugins/client/sauceware-audio-scorch.jpg";
import knockImage from "../../media/plugins/client/plugins-that-knock.jpg";
import RepeaterPlugin from "./repeater/RepeaterPlugin";
import {Route} from "react-router-dom";

const myPlugins = [{
  id: "repeater",
  name: "Repeater",
  description: "A comprehensive delay plugin",
  image: repeaterImage,
  route: "/plugins/repeater",
  component: RepeaterPlugin
}, {
  id: "repeater-2",
  name: "Repeater",
  description: "A comprehensive delay plugin",
  image: repeaterImage,
  route: "/plugins/repeater-2",
  component: RepeaterPlugin
}]

const clientPlugins = [{
  id: "knock",
  name: "Plugins That Knock",
  description: "Knock is a drum processor with plenty of dynamics processing included - transient shaper, saturator and shaped clipper. It also features a tuneable bass synthesizer which layers on top of low frequency transients.",
  image: knockImage,
  route: "https://pluginsthatknock.com/"
}, {
  id: "scorch",
  name: "Sauceware Audio - Scorch",
  description: "Scorch is a visual heavy synthesizer. It features an expansive SFZ sound library, a chord generator, a granulizer, an LFO controlled filter section and a stereo delay.",
  image: scorchImage,
  route: "https://saucewareaudio.com/products/scorch"
}, {
  id: "sequel",
  name: "Beatskillz - Sequel",
  description: "Sequel is a drum sampler/sequencer that brings back the quick vintage drum machine workflow. It features an internal 8 track MIDI sequencer with pitch and amplitude mapping, with tempo controls.",
  image: beatskillzSequelImage,
  route: "https://www.beatskillz.com/shop/sequel/"
}, {
  id: "elements",
  name: "Ocean - Elements",
  description: "Elements is a 4 in 1 FX plugin which adds character to tracks. It's made up of a filter chain, delay, reverb and distortion modules tuned for hip-hop",
  image: oceanElementsImage,
  route: "https://www.prodbyocean.com/pages/elements"
}]

export const PluginsContext = createContext({myPlugins, clientPlugins});

const PluginHome = (props) => {
  return (
    <>
      {myPlugins.map(plugin => (
        <Route key={plugin.id} path={plugin.route} component={plugin.component}/>
      ))}
      <Route path={"/plugins"} exact={true} component={PluginThumbDisplay}/>
    </>
  );
}

export default PluginHome;