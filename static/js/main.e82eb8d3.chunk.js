(this["webpackJsonptilt-audio"]=this["webpackJsonptilt-audio"]||[]).push([[0],{14:function(e,t,i){e.exports={canvasContainer:"SliderContainer_canvasContainer__1bNWt",canvasContainerDesktop:"SliderContainer_canvasContainerDesktop__3CRLr",canvasContainerMobile:"SliderContainer_canvasContainerMobile__3KuVe",sliderContainer:"SliderContainer_sliderContainer__hBVMZ",sliderLabel:"SliderContainer_sliderLabel__L_NRZ",sliderInput:"SliderContainer_sliderInput__1oLwo",relativeBox:"SliderContainer_relativeBox__23f-V"}},83:function(e,t,i){},84:function(e,t,i){"use strict";i.r(t);var n=i(2),s=i(0),a=i.n(s),r=i(10),o=i.n(r),c=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,135)).then((function(t){var i=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;i(e),n(e),s(e),a(e),r(e)}))},l=i(118),d=i(129),h=i(124),u=i(125),p=i(25),f=i(120),b=i(24),m=i(40),j=i(17),g=i(58),v=i.n(g),x=i(122),y=i(131),O=Object(l.a)((function(e){return{toolbar:{borderBottom:"1px solid ".concat(e.palette.divider)},toolbarMobile:{display:"flex",justifyContent:"space-between"},toolbarTitle:{flex:1},toolbarLink:{padding:e.spacing(2),flexShrink:0,color:"inherit",textDecoration:"none"},light:{fontFamily:"TwCenMTStd-Light"},bold:{fontFamily:"TwCenMTStd-ExtraBold"}}}));function w(e){var t=O(),i=e.sections,s=a.a.useState(!1),r=Object(p.a)(s,2),o=r[0],c=r[1],l=function(e){c(e)};return Object(n.jsxs)(a.a.Fragment,{children:[Object(n.jsx)(j.BrowserView,{children:Object(n.jsxs)(f.a,{className:t.toolbar,children:[Object(n.jsxs)(m.a,{component:"h2",variant:"h3",color:"inherit",noWrap:!0,className:t.toolbarTitle,children:[Object(n.jsx)("b",{className:t.bold,children:"tilt"}),Object(n.jsx)("span",{className:t.light,children:"audio"})]}),i.map((function(e){return Object(n.jsx)(b.b,{to:e.route,className:t.toolbarLink,children:e.title},e.title)}))]})}),Object(n.jsxs)(j.MobileView,{children:[Object(n.jsxs)(f.a,{className:"".concat(t.toolbar," ").concat(t.toolbarMobile),children:[Object(n.jsxs)(m.a,{component:"h2",variant:"h3",color:"inherit",noWrap:!0,className:t.toolbarTitle,children:[Object(n.jsx)("b",{className:t.bold,children:"tilt"}),Object(n.jsx)("span",{className:t.light,children:"audio"})]}),Object(n.jsx)(x.a,{color:"inherit",edge:"end",onClick:function(){return l(!0)},children:Object(n.jsx)(v.a,{})})]}),Object(n.jsx)(y.a,{anchor:"right",open:o,onClose:function(){return l(!1)},onOpen:function(){return l(!0)},children:i.map((function(e){return Object(n.jsx)(b.b,{to:e.route,className:t.toolbarLink,children:e.title},e.title)}))})]})]})}var C=i(34),k=i.n(C),M=i(15),S=i(13),F=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:0,y:0},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.7,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null;Object(M.a)(this,e),this.p5=t,this.phase=0,this.amplitude=s,this.frequency=a,this.dimensions=n,this.coordinates=i,this.speed=r,this.color=o,this.additionalPhase=0,this.heightOffset=0,this.offset=2*Math.PI*this.frequency/Math.floor(this.dimensions.x)}return Object(S.a)(e,[{key:"display",value:function(){this.p5.stroke(this.color),this.p5.noFill(),this.p5.strokeWeight(3),this.p5.beginShape();for(var e=Math.floor(this.dimensions.x);e>0;e--)this.p5.vertex(this.coordinates.x+e,this.coordinates.y+this.heightOffset*this.dimensions.y+this.update());this.p5.endShape(),this.phase+=this.offset*this.speed}},{key:"update",value:function(){var e=Math.sin(this.phase+this.additionalPhase);return this.phase+=this.offset,e*this.amplitude*(this.dimensions.y/2)}},{key:"setFrequency",value:function(e){this.frequency=e,this.recalculateOffset()}},{key:"setAmplitude",value:function(e){this.amplitude=e}},{key:"setSpeed",value:function(e){this.speed=e}},{key:"setPhase",value:function(e){this.additionalPhase=2*e*Math.PI}},{key:"setHeightOffset",value:function(e){this.heightOffset=e}},{key:"recalculateOffset",value:function(){this.offset=2*Math.PI*this.frequency/Math.floor(this.dimensions.x)}}]),e}(),q=i(133),N=function(){function e(t,i,n,s,a){var r=this;Object(M.a)(this,e),this.emitterDestructorCallback=function(e){r.samples.delete(e.id),e=null},this.p5=t,this.dimensions=i,this.phase=0,this.amplitude=n,this.speed=a,this.frequency=s,this.emitterPosition=0,this.offset=4*Math.PI*s/i.x,this.samplingInterval=500,this.samples=new Map;setTimeout((function e(){var t=Object(q.a)();r.samples.set(t,new T(t,r.p5,{x:r.dimensions.x/2,y:r.emitterPosition},r.dimensions.x,r.emitterDestructorCallback,r.frequency,r.speed)),setTimeout(e,r.samplingInterval)}),this.samplingInterval)}return Object(S.a)(e,[{key:"display",value:function(){var e=this.p5,t=this.dimensions,i=t.x,n=t.y;e.stroke(e.color(200,200,200,80)),e.strokeWeight(2),e.line(i/2,0,i/2,n),e.ellipse(i/2,this.updateEmitter(),25,25),this.samples.forEach((function(e){return e.display()}))}},{key:"updateEmitter",value:function(){var e=Math.sin(this.phase);return this.phase+=this.offset*this.speed,this.emitterPosition=this.dimensions.y/2+e*this.amplitude*this.dimensions.y/2,this.emitterPosition}},{key:"setFrequency",value:function(e){this.frequency=e,this.samples.clear(),this.recalculateOffset()}},{key:"setAmplitude",value:function(e){this.amplitude=e}},{key:"setSpeed",value:function(e){var t=this;this.speed=e,this.samples.forEach((function(e){return e.setSpeed(t.speed)}))}},{key:"setSamplingInterval",value:function(e){this.samplingInterval=1e3*e}},{key:"recalculateOffset",value:function(){this.offset=4*Math.PI*this.frequency/this.dimensions.x}}]),e}(),T=function(){function e(t,i,n,s,a,r,o){Object(M.a)(this,e),this.id=t,this.p5=i,this.position=n,this.containerWidth=s,this.destructorCallback=a,this.frequency=r,this.speed=o,this.size=20}return Object(S.a)(e,[{key:"display",value:function(){var e=this.p5,t=this.size;e.noStroke(),e.fill(e.color(255,166,166)),this.update(),e.ellipse(this.position.x,this.position.y,t,t)}},{key:"update",value:function(){this.position.x+=this.speed,this.position.x-this.size>this.containerWidth&&this.destructorCallback(this)}},{key:"setSpeed",value:function(e){this.speed=e}}]),e}(),W=N,A=function e(t,i,n,s,a,r){Object(M.a)(this,e),this.id=t,this.parameter=i,this.defaultValue=n,this.minValue=s,this.maxValue=a,this.step=r},I=i(14),P=i.n(I),V=Object(l.a)((function(){return{headingSection:{display:"flex",justifyContent:"space-between",alignItems:"center"},headingTitle:{fontSize:"2em",fontWeight:"bold",margin:"0 0.5em 0.5em  0.5em"},headingCategory:{fontSize:"1.5em",margin:"0 0 0.5em 0.5em",textAlign:"right"}}})),L=function(e){var t=e.match,i=V(),a=t.path.substring(t.path.lastIndexOf("/")+1),r=Object(s.useContext)(Ce).find((function(e){return e.id===a}));return Object(n.jsxs)("div",{className:i.headingSection,children:[Object(n.jsx)("p",{className:i.headingTitle,children:r.title}),Object(n.jsx)("p",{className:i.headingCategory,children:r.category})]})},_=i(67),D=i(66),R=i(59),B=i.n(R),z=(i(82),function(e){Object(_.a)(i,e);var t=Object(D.a)(i);function i(e){var n;return Object(M.a)(this,i),(n=t.call(this,e)).dialRef=a.a.createRef(),n}return Object(S.a)(i,[{key:"componentDidMount",value:function(){var e=this,t=this.props.model,i=t.minValue,n=t.maxValue,s=t.defaultValue,a=t.step;this.dial=new B.a.FLStandardKnob(this.dialRef.current,{min:i,max:n,initial:s,step:a,color:this.props.color}),this.dial.addEventListener("change",(function(t){e.props.changeCallback(t)}))}},{key:"render",value:function(){return console.log("Rendering dial ".concat(this.props.model.parameter)),Object(n.jsx)("div",{ref:this.dialRef})}}]),i}(s.Component)),E=function(e){var t=e.sliders;return Object(n.jsxs)("div",{style:{width:"100%",overflow:"hidden"},children:[Object(n.jsx)(h.a,{container:!0,justify:"center",alignItems:"center",spacing:2,children:t.map((function(t){return Object(n.jsx)(h.a,{item:!0,xs:3,children:Object(n.jsx)(z,{model:t.sliderModel,color:e.color,changeCallback:function(e){return t.sliderCallback(e.target.value)}})},t.sliderModel.id)}))}),Object(n.jsx)(h.a,{container:!0,justify:"center",alignItems:"center",spacing:2,children:t.map((function(e){return Object(n.jsx)(h.a,{className:P.a.sliderLabel,item:!0,xs:3,children:e.sliderModel.parameter},e.sliderModel.id)}))})]})},H=a.a.memo(E);var G=i(123),K=i(126),Z=i(134),J=i(127),Y=i(132),U=i(64),X=i.n(U),Q=i(60),$=i.n(Q),ee=i(63),te=i.n(ee),ie=i(61),ne=i.n(ie),se=i(62),ae=i.n(se),re=Object(l.a)((function(e){return{sidebarAboutBox:{padding:e.spacing(2)},sidebarSection:{marginTop:e.spacing(3)},description:{textAlign:"justify",fontFamily:"TwCenMTStd-Light"},searchBox:{marginTop:"2em",padding:"2px 4px",display:"flex",alignItems:"center",marginBottom:"1em"},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10},linkStyle:{textDecoration:"none",color:"inherit",cursor:"pointer"}}})),oe=[{name:"GitHub",icon:$.a,url:"https://github.com/Thrifleganger/"},{name:"YouTube",icon:ne.a,url:"https://www.youtube.com/channel/UCb_NEjjKOXV9pilaSOjlkZA"},{name:"Facebook",icon:ae.a,url:"https://www.facebook.com/akash.murthy.319/"},{name:"Instagram",icon:te.a,url:"https://www.instagram.com/thrifleganger/"}];function ce(e){console.log("Rendering sidebar");var t=re(),i=e.match,a=Object(s.useState)(null),r=Object(p.a)(a,2),o=r[0],c=r[1],l=Object(s.useContext)(Ce),d=l.find((function(e){return e.id===i.params.id})),u=l.filter((function(e){return null==o||e.title.toLowerCase().includes(o.toLowerCase())||e.category.toLowerCase().includes(o.toLowerCase())||e.shortDescription.toLowerCase().includes(o.toLowerCase())?e:null}));return Object(n.jsxs)(h.a,{item:!0,xs:12,md:4,children:[Object(n.jsx)(G.a,{elevation:0,className:t.sidebarAboutBox,children:Object(n.jsx)(m.a,{className:t.description,dangerouslySetInnerHTML:{__html:d.shortDescription}})}),Object(n.jsxs)(G.a,{component:"form",className:t.searchBox,children:[Object(n.jsx)(Y.a,{className:t.input,placeholder:"Search widgets",inputProps:{"aria-label":"Search widgets"},onChange:function(e){return c(e.target.value)}}),Object(n.jsx)(X.a,{})]}),Object(n.jsx)(G.a,{children:Object(n.jsx)(K.a,{component:"nav","aria-label":"main mailbox folders",children:u.map((function(e){return Object(n.jsx)(b.b,{className:t.linkStyle,to:e.route,children:Object(n.jsx)(Z.a,{button:!0,selected:d.id===e.id,children:Object(n.jsx)(J.a,{primary:e.sidebarTitle})})},e.id)}))})}),Object(n.jsx)(m.a,{variant:"h6",gutterBottom:!0,className:t.sidebarSection,children:"Social"}),oe.map((function(e){return Object(n.jsx)("a",{className:t.linkStyle,href:e.url,target:"_black",children:Object(n.jsxs)(h.a,{container:!0,direction:"row",spacing:1,alignItems:"center",children:[Object(n.jsx)(h.a,{item:!0,children:Object(n.jsx)(e.icon,{})}),Object(n.jsx)(h.a,{item:!0,children:e.name})]})},e.name)}))]})}var le=i(128);function de(){return Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(n.jsx)(le.a,{color:"inherit",href:"#",children:"Tilt Audio"})," ",(new Date).getFullYear(),"."]})}var he=Object(l.a)((function(e){return{footer:{backgroundColor:e.palette.background.paper,padding:e.spacing(6,0),marginTop:"3em"},light:{fontFamily:"TwCenMTStd-Light"},bold:{fontFamily:"TwCenMTStd-ExtraBold"}}}));function ue(e){var t=he();return Object(n.jsx)("footer",{className:t.footer,children:Object(n.jsxs)(u.a,{maxWidth:"lg",children:[Object(n.jsxs)(m.a,{component:"h2",variant:"h4",align:"center",color:"inherit",noWrap:!0,className:t.toolbarTitle,children:[Object(n.jsx)("b",{className:t.bold,children:"tilt"}),Object(n.jsx)("span",{className:t.light,children:"audio"})]}),Object(n.jsx)(m.a,{variant:"subtitle1",align:"center",color:"textSecondary",component:"p",children:"Talk to me. I don't bite."}),Object(n.jsx)(de,{})]})})}var pe=function(e){var t,i,a=e.match,r=new A("amplitude-slider","Amplitude",.7,0,1,.01),o=new A("frequency-slider","Frequency",1,1,6,1),c=new A("phase-slider","Phase",0,-1,1,.01),l=new A("offset-slider","Offset",0,-.5,.5,.01),d=Object(s.useRef)(null);Object(s.useEffect)((function(){return t=new k.a(p,d.current),function(){t.remove()}}));var p=function(e){e.setup=function(){console.log("Sine wave canvas setup"),j.isMobile?e.createCanvas(d.current.clientWidth,300):e.createCanvas(d.current.clientWidth,500),i=new F(e,{x:0,y:e.height/2},{x:e.width,y:e.height},r.defaultValue,o.defaultValue,0,e.color(255,166,166))},e.draw=function(){e.background(e.color(10,23,38)),i.display(),e.stroke(e.color(200,200,200,80)),e.strokeWeight(2),e.line(0,e.height/2,e.width,e.height/2)},e.windowResized=function(){j.isMobile?e.createCanvas(d.current.clientWidth,300):e.createCanvas(d.current.clientWidth,500)}},f=[{sliderModel:r,sliderCallback:function(e){return t=e,void i.setAmplitude(t);var t}},{sliderModel:o,sliderCallback:function(e){return t=e,void i.setFrequency(t);var t}},{sliderModel:c,sliderCallback:function(e){return function(e){var t=parseFloat(e);i.setPhase(t)}(e)}},{sliderModel:l,sliderCallback:function(e){return t=e,void i.setHeightOffset(t);var t}}];return Object(n.jsxs)(h.a,{item:!0,xs:12,md:8,children:[Object(n.jsx)(L,{match:a}),Object(n.jsx)("div",{className:"".concat(P.a.canvasContainer," ").concat(j.isMobile?P.a.canvasContainerMobile:P.a.canvasContainerDesktop),children:Object(n.jsx)("div",{ref:d})}),Object(n.jsx)("div",{className:P.a.sliderContainer,children:Object(n.jsx)(u.a,{maxWidth:"sm",children:Object(n.jsx)(H,{sliders:f,color:"#ffa6a6"})})})]})},fe=i(9),be=function(){function e(t){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;Object(M.a)(this,e),this.setAmplitude=function(e){i.radius=e,i.animatedRadius.setAmplitude(e)},this.setFrequency=function(e){i.animatedRadius.setFrequency(e)},this.setSpeed=function(e){i.animatedRadius.setSpeed(e)},this.p=t,this.radius=s,this.position=n,this.frequency=a,this.animatedRadius=new me(t,this.position,s,a)}return Object(S.a)(e,[{key:"display",value:function(){var e=this.position,t=e.x,i=e.y,n=this.p,s=n.width,a=n.height,r=this.p,o=this.radius,c=this.animatedRadius;r.noFill(),r.strokeWeight(2),r.stroke(200,200,200,60),r.line(0,i,s,i),r.line(t,0,t,a),r.line(t-o,i,t-o,a),r.line(t+o,i,t+o,a),r.line(t,i-o,s,i-o),r.line(t,i+o,s,i+o),r.stroke(r.color(240)),r.ellipse(t,i,2*o,2*o),c.display()}}]),e}(),me=function(){function e(t){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},s=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0;Object(M.a)(this,e),this.setAmplitude=function(e){i.length=e},this.setFrequency=function(e){i.frequency=e,i.offset=2*Math.PI*i.frequency/Math.floor(i.p.width)},this.setSpeed=function(e){i.speed=e},this.p=t,this.origin=n,this.length=s,this.frequency=a,this.speed=1,this.phase=0,this.offset=2*Math.PI*a/Math.floor(t.width)}return Object(S.a)(e,[{key:"display",value:function(){var e=this.p,t=this.length,i=this.phase,n=this.offset,s=this.speed,a=this.origin,r=a.x,o=a.y,c=r+Math.cos(i)*t,l=o+Math.sin(i)*t;e.line(r,o,c,l),e.strokeWeight(3),e.stroke(e.color(226,166,255)),e.line(r,o,c,o),e.drawingContext.setLineDash([5,10]),e.line(c,o,c,e.width/5+t),e.drawingContext.setLineDash([]),e.stroke(e.color(197,255,116)),e.line(c,l,c,o),e.drawingContext.setLineDash([5,10]),e.line(c,l,e.width/5+t,l),e.drawingContext.setLineDash([]),this.phase-=n*s}}]),e}(),je=be,ge=function(){function e(t){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0},s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:t.color(255),c=arguments.length>6&&void 0!==arguments[6]&&arguments[6];Object(M.a)(this,e),this.setAmplitude=function(e){i.amplitude=e},this.setFrequency=function(e){i.frequency=e,i.offset=2*Math.PI*i.frequency/Math.floor(i.width)},this.setSpeed=function(e){i.speed=e},this.p=t,this.startingPosition=n,this.frequency=s,this.speed=1,this.amplitude=a,this.width=Math.floor(t.width),this.initialPhase=r,this.phase=0,this.isFlipped=c,this.color=o,this.offset=2*Math.PI*s/Math.floor(this.width)}return Object(S.a)(e,[{key:"display",value:function(){var e=this.p,t=this.width,i=this.isFlipped,n=this.color,s=this.startingPosition,a=s.x,r=s.y;e.noFill(),e.strokeWeight(3),e.stroke(n),e.beginShape();for(var o=0;o<t;o++)i?e.vertex(a+this.update(),r+o):e.vertex(a+o,r+this.update());e.endShape(),this.phase-=this.offset*this.speed}},{key:"update",value:function(){var e=Math.sin(this.phase-this.initialPhase);return this.phase+=this.offset,e*this.amplitude}}]),e}(),ve=function(e){var t,i,a,r,o=e.match,c=new A("amplitude-slider","Amplitude",1,0,1,.01),l=new A("frequency-slider","Frequency",6,1,14,1),d=new A("speed-slider","Animation Speed",1,.25,5,.01),p=Object(s.useRef)(null);Object(s.useEffect)((function(){return t=new k.a(f,p.current),function(){t.remove()}}));var f=function(e){e.setup=function(){console.log("Sine function canvas setup"),j.isMobile?e.createCanvas(p.current.clientWidth,300):e.createCanvas(p.current.clientWidth,500);var t=e.width/10,n={x:e.width/16+t,y:e.width/16+t},s={x:e.width/5+t,y:e.width/16+t},o={x:e.width/16+t,y:e.width/5+t};i=new je(e,n,t,l.defaultValue),a=new ge(e,s,l.defaultValue,t,0,e.color(197,255,116),!1),r=new ge(e,o,l.defaultValue,t,3*Math.PI/2,e.color(226,166,255),!0)},e.draw=function(){e.background(e.color(10,23,38)),i.display(),a.display(),r.display()},e.windowResized=function(){j.isMobile?e.createCanvas(p.current.clientWidth,300):e.createCanvas(p.current.clientWidth,500)}},b=[{sliderModel:c,sliderCallback:function(e){return function(e){var n=t.width/10*e;i.setAmplitude(n),a.setAmplitude(n),r.setAmplitude(n)}(e)}},{sliderModel:l,sliderCallback:function(e){return t=e,i.setFrequency(t),a.setFrequency(t),void r.setFrequency(t);var t}},{sliderModel:d,sliderCallback:function(e){return function(e){var t=parseFloat(e);i.setSpeed(t),a.setSpeed(t),r.setSpeed(t)}(e)}}];return Object(n.jsxs)(h.a,{item:!0,xs:12,md:8,children:[Object(n.jsx)(L,{match:o}),Object(n.jsx)("div",{className:"".concat(P.a.canvasContainer," ").concat(j.isMobile?P.a.canvasContainerMobile:P.a.canvasContainerDesktop),children:Object(n.jsx)("div",{ref:p})}),Object(n.jsx)("div",{className:P.a.sliderContainer,children:Object(n.jsx)(u.a,{maxWidth:"sm",children:Object(n.jsx)(H,{sliders:b,color:"#c5ff74"})})})]})},xe=function(e){var t,i=Object(s.useContext)(Ce),a=i[(t=i.length,Math.floor(Math.random()*Math.floor(t)))].route;return Object(n.jsx)(fe.a,{to:a})},ye=Object(l.a)((function(e){return{mainGrid:{marginTop:e.spacing(3)}}})),Oe=[{title:"Articles",url:"#"},{title:"Widgets",route:"/widgets"},{title:"Videos",url:"#"},{title:"Plugins",url:"#"}],we=[{id:"aliasing",sidebarTitle:"Aliasing",title:"Aliasing",category:"Digital Audio Fundamentals",route:"/widgets/aliasing",shortDescription:"An aliased signal is an imposter. An unexpected and unwanted intruder in your digital signal. Changing the <b>frequency</b> or <b>sampling interval</b> changes how many samples are captured. If there are less than 3 samples per cycle of the sine wave, you've lost the ability to recreate the sine wave for that frequency. Instead what you get is a signal interpreted with a different frequency.",component:function(e){var t,i,a,r,o=new A("amplitude-slider","Amplitude",.7,0,1,.01),c=new A("frequency-slider","Frequency",1,1,6,1),l=new A("speed-slider","Animation Speed",1,.25,5,.01),d=new A("sampling-interval-slider","Sampling Interval",.5,.2,2,.01),p=Object(s.useRef)(null);Object(s.useEffect)((function(){return t=new k.a(f,p.current),function(){t.remove()}}));var f=function(e){e.setup=function(){console.log("Aliasing canvas setup"),j.isMobile?e.createCanvas(p.current.clientWidth,300):e.createCanvas(p.current.clientWidth,500),i=new F(e,{x:0,y:e.height/2},{x:e.width/2,y:e.height},o.defaultValue,c.defaultValue,l.defaultValue,e.color(116,249,255)),a=new F(e,{x:e.width/2,y:e.height/2},{x:e.width/2,y:e.height},o.defaultValue,c.defaultValue,l.defaultValue,e.color(116,249,255,60)),r=new W(e,{x:e.width,y:e.height},o.defaultValue,c.defaultValue,l.defaultValue)},e.draw=function(){e.background(e.color(10,23,38)),i.display(),a.display(),r.display()},e.windowResized=function(){j.isMobile?e.createCanvas(p.current.clientWidth,300):e.createCanvas(p.current.clientWidth,500)}},b=[{sliderModel:o,sliderCallback:function(e){return t=e,i.setAmplitude(t),a.setAmplitude(t),void r.setAmplitude(t);var t}},{sliderModel:c,sliderCallback:function(e){return t=e,i.setFrequency(t),a.setFrequency(t),void r.setFrequency(t);var t}},{sliderModel:l,sliderCallback:function(e){return function(e){var t=parseFloat(e);i.setSpeed(t),a.setSpeed(t),r.setSpeed(t)}(e)}},{sliderModel:d,sliderCallback:function(e){return t=e,void r.setSamplingInterval(t);var t}}];return Object(n.jsxs)(h.a,{item:!0,xs:12,md:8,children:[Object(n.jsx)(L,{match:e.match}),Object(n.jsx)("div",{className:"".concat(P.a.canvasContainer," ").concat(j.isMobile?P.a.canvasContainerMobile:P.a.canvasContainerDesktop),children:Object(n.jsx)("div",{ref:p})}),Object(n.jsx)("div",{className:P.a.sliderContainer,children:Object(n.jsx)(u.a,{maxWidth:"sm",children:Object(n.jsx)(H,{sliders:b,color:"#74F9FF"})})})]})}},{id:"sinusoid-properties",sidebarTitle:"Sinusoid properties",title:"Properties of sinusoids",category:"Origins of the sine wave",route:"/widgets/sinusoid-properties",shortDescription:"Dance with your sine wave. Remember the rules, <b>amplitude</b> to swing your arms wide or keep them close to your body, <b>phase</b> to sway from side to side, <b>offset</b> to duck or to jump, and <b>frequency</b>. Well frequency is your party piece. Show them what you got. ",component:pe},{id:"sine-cosine",sidebarTitle:"Sine Cosine Visualized",title:"Sine Cosine Visualized",category:"Origins of the sine wave",route:"/widgets/sine-cosine",shortDescription:"Whip out your magic pens. Attach them to the circumference of a unit circle. Put a sheet of paper underneath your circle and start rotating the circle. Now, start pulling the paper away from the circle. What you get is a sine wave (green). Now start pulling the paper perpendicularly, and you get another sine wave ofcourse, only this time, offset by a little. The offset is exactly 2\u03c0 radian, and hence a cosine wave (pink). <b>Freqeuncy</b> to turn the circle faster, and <b>amplitude</b> to change the size of the circle. ",component:ve}],Ce=Object(s.createContext)(we);function ke(){var e=ye();return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(d.a,{}),Object(n.jsxs)(u.a,{maxWidth:"lg",children:[Object(n.jsx)(w,{sections:Oe}),Object(n.jsx)("main",{children:Object(n.jsx)(Ce.Provider,{value:we,children:Object(n.jsxs)(h.a,{container:!0,spacing:5,className:e.mainGrid,children:[we.map((function(e){return Object(n.jsx)(fe.b,{path:e.route,component:e.component},e.id)})),Object(n.jsx)(fe.b,{path:"/widgets/:id",component:ce}),Object(n.jsx)(fe.b,{path:"/widgets",exact:!0,component:xe}),Object(n.jsx)(fe.b,{path:"/",exact:!0,component:xe})]})})})]}),Object(n.jsx)(ue,{title:"Footer",description:"Something here to give the footer a purpose!"})]})}var Me=i(65),Se=i(130),Fe=(i(83),Object(Me.a)({palette:{type:"dark"},typography:{fontFamily:'"TwCenMTStd", "Helvetica", "Arial", "sans-serif"',fontSize:16}}));o.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(Se.a,{theme:Fe,children:Object(n.jsx)(b.a,{children:Object(n.jsx)(ke,{})})})}),document.getElementById("root")),c()}},[[84,1,2]]]);
//# sourceMappingURL=main.e82eb8d3.chunk.js.map