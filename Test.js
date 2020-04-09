

//var newDiv = document.createElement("div");
//newDiv.className='ball two';
//document.getElementsByTagName('body')[0].appendChild(newDiv);
//document.getElementsByTagName('body')[0].appendChild(newDiv);

/*
function generator(count) { 
    loop=count;
    return (function(anim) {
        //document.getElementById("one").remove();
        loop--;
        if (loop < 0) return;
        console.log("generator called")
        var newDiv = document.createElement("div");
        newDiv.className='ball one';
        newDiv.left=loop*50;
        newDiv.top=loop*50;
        document.getElementsByTagName('body')[0].appendChild(newDiv);
        } )
    }
*/

CONSTS = {
  topOffset: 50,
  leftOffset: 100,
  internalOffset: 10,
  youngWidth: 400,
  youngHeight: 600,
  ballSize: 20,
  duration: 5000,
}

function createDiv(p) {
  //console.log(p);
  var d=document.createElement("div");
  d.className=p.clazz;
  d.id=p.id;
  d.style.position='absolute';
  d.style.left=p.x ? p.x + 'px': null
  d.style.top=p.y ? p.y + 'px' : null
  d.style.width=p.w ? p.w + 'px' : null
  d.style.height=p.h ? p.h + 'px' : null
  d.style.backgroundColor=p.c ? p.c : null
  d.style.border_radius=p.br ? p.br : null ;
  //console.log(d);
  document.getElementsByTagName('body')[0].appendChild(d);
  return(d);
  }

  class Ball {
    static num=0
    constructor(p) {
      //console.log("Ball")
      this.clazz='ball ' + p.clazz
      this.id="ball" + Ball.num
      Ball.num++
      this.w= p.w ? p.w : null
      this.h= p.h ? p.h : null
      this.x= p.x ? p.x : null
      this.y= p.y ? p.y : null
      this.c= p.c ? p.c : null
      this.age = p.age ? p.age : null
      this.ttl = p.ttl ? p.ttl : null
      this.position= "absolute"
      this.borderRadius= "10%"
      this.div=createDiv(this)
    }
  }

  class Young {
    static young = {
    clazz: 'young',
    id: 'youg',
    x: CONSTS.leftOffset,
    y: CONSTS.topOffset,
    w: CONSTS.youngWidth,
    h: CONSTS.youngHeight,
    c: 'lightgrey'
  }
}

  old= {
    clazz: 'old',
    id: 'old',
    x: CONSTS.leftOffset + Young.young.w,
    y: CONSTS.topOffset,
    w: 2*Young.young.w,
    h: Young.young.h,
    c: 'grey'
  }
  eden= {
    clazz: 'eden',
    id: 'eden',
    x: Young.young.x + CONSTS.internalOffset,
    y: Young.young.y + CONSTS.internalOffset,
    w: Math.round(Young.young.w/2),
    h: Young.young.h - 2*CONSTS.internalOffset ,
    c: 'pink'
  }
  s0= {
    clazz: 's0',
    id: 's0',
    x: eden.x + eden.w + CONSTS.internalOffset,
    y: eden.y,
    w: Math.round(Young.young.w/5),
    h: eden.h ,
    c: 'green'
  }
  s1= {
    clazz: 's1',
    id: 's1',
    x: s0.x + s0.w + CONSTS.internalOffset,
    y: eden.y,
    w: s0.w,
    h: eden.h ,
    c: 'yellow'
  }
createDiv( Young.young )
createDiv( old )
createDiv( eden )
createDiv( s0 )
createDiv( s1 )

//----------------------------------------------------------------------------------------------------
function createOne() {
  return( ()=> {
    let anim=anime.timeline({
      duration: 500,
      easing: 'easeInOutSine',
      loop: false })
      anim.add({
        targets: ".ball",
        //translateX: (elm,index,t) => { console.log(elm + index) ; return(100+10*index) },
        //translateY: (elm,index,t) => { console.log(index) ; return(100+10*index) },
        delay: (elm,index,t) => 0,
        backgroundColor: 'rgb(0, 128, 128)',
        update: function(anim){
          if ( Ball.num < 20 ) {
            new Ball({w: CONSTS.ballSize,h:CONSTS.ballSize,x:100,y:10*Ball.num,c:'pink',clazz:''})
        }
        //console.log("update")
      },
      begin: function(anim) {
        //document.getElementById("one").remove();
        console.log("1.1 begin")
      } ,  
      complete: function(anim) {
        //document.getElementById("one").remove();
        console.log("1.1 over")
      }  
    })
    return(anim)
  }
  )
  //return(f)
}

function moveOne() {
  console.log("moveOne called")
  return (()=> {
    let anim=anime.timeline({
      duration: 5000,
      easing: 'easeInOutSine',
      loop: false })
    anim.add({
      targets: ".ball",
      backgroundColor: 'rgb(0, 134, 255)',
      duration: 5000,
      translateX: (elm,index,t) => { console.log(index);return(index*3) },
      translateY: (elm,index,t) => { return(index*30) },
      update: function(anim){
         //console.log("update 2")
      },
      begin: function(anim) {
        //document.getElementById("one").remove();
        console.log("1.2 begin")
      } ,  
      complete: function(anim) {
        //document.getElementById("one").remove();
        console.log("1.2 over")
      }  
    })
    anim.add({
      targets: ".ball",
      backgroundColor: 'rgb(0, 0, 255)',
      translateY: (elm,index,t) => { return(index*50) },
      update: function(anim){
        //console.log("update 2")
      },
      begin: function(anim) {
      //document.getElementById("one").remove();
        console.log("1.3 begin")
      },  
      complete: function(anim) {
        var c=document.getElementsByClassName("ball")
        for (i=0;i<c.length;i++) {
          if (i%2 ) {
            c[i].className += " toOld"
            //console.log(c[i])
          } else {
            c[i].className += " toTop"
          }
        }
        console.log("1.3 over")
      }  
    })
    return(anim)
  }
  )
//return(f)
}

//----------------------------------------------------------------------------------------------------
function moveTwo() {
  return(()=>{
    anime.timeline({
      duration: CONSTS.duration,
      easing: 'easeInOutSine',
      loop: false })
    .add({
      targets: ".toOld",
      backgroundColor: 'rgb(0, 0, 255)',
      duration: 1000,
      translateX: (elm,index,t) => { console.log(elm + index) ; return(50*index + 600) },
      update: function(anim){
        //console.log("update 2.1")
      },
      begin: function(anim) {
      //document.getElementById("one").remove();
      //console.log("2.1 begin")
      },  
      complete: function(anim) {
      //console.log("2.1 over")
      }  
    })
    .add({
      targets: ".toTop",
      backgroundColor: 'rgb(128, 0, 255)',
      duration: 2000,
      translateY: (elm,index,t) => { console.log(elm + index) ; return(50*index + 100) },
      update: function(anim){
      //console.log("update 2.1")
      },
      begin: function(anim) {
    //document.getElementById("one").remove();
      //console.log("2.2 begin")
      },  
      complete: function(anim) {
      //console.log("2.2 over")
      }  
    })
   }
  )
 //return(f)
}

function getScene(scenes,idx) {
  function f() {
    playScenes(scenes,idx)
  }
  return(f)
}

function playScenes(scenes,idx) {
  console.log("index=" + idx + " len=" + scenes.length)
  console.log("To exec=" + scenes[idx])
  var f=scenes[idx]();
  console.log("Got=" + f)
  if ( idx < scenes.length-1 ) {
    num=idx+1
    console.log("when finished call idx =" + num + " func is " + scenes[num])
    f().finished.then(getScene(scenes,idx+1));
}
  f()
  console.log("Executed=" + f)
}

//----------------------------------------------------------------------------------------------------
myScenes=[createOne,moveOne,moveTwo]
playScenes(myScenes,0)






