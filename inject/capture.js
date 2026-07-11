
(()=>{
 if(window.__WebGLExtractor)return;
 const ext={contexts:[],stats:{uploads:0,drawCalls:0},buffers:{},drawCalls:[]};
 window.__WebGLExtractor=ext;
 const ids=new WeakMap(); let next=1;
 const id=b=>{if(!b)return null;if(!ids.has(b))ids.set(b,next++);return ids.get(b);}
 const orig=HTMLCanvasElement.prototype.getContext;
 HTMLCanvasElement.prototype.getContext=function(t,a){
   const gl=orig.call(this,t,a);
   if(!gl||gl.__uwe||!(t==="webgl"||t==="webgl2")) return gl;
   gl.__uwe=true; ext.contexts.push(gl);
   const bb=gl.bindBuffer;
const bd=gl.bufferData;
const bs=gl.bufferSubData;
const de=gl.drawElements;
const vap=gl.vertexAttribPointer;
   let ab=null, eb=null;
   gl.bindBuffer=function(target,buf){
      if(target===gl.ARRAY_BUFFER)ab=id(buf);
      if(target===gl.ELEMENT_ARRAY_BUFFER)eb=id(buf);
      return bb.apply(this,arguments);
   };
   gl.bufferData=function(target,data){
      if(data&&(data instanceof ArrayBuffer||ArrayBuffer.isView(data))){
        const copy=data instanceof ArrayBuffer?data.slice(0):data.buffer.slice(0);
        ext.buffers[target===gl.ARRAY_BUFFER?ab:eb]={target,byteLength:copy.byteLength,data:copy};
        ext.stats.uploads++;
      }
      return bd.apply(this,arguments);
   };
   gl.bufferSubData=function(){ext.stats.uploads++; return bs.apply(this,arguments);}
let attributes = {};

gl.vertexAttribPointer = function(index,size,type,normalized,stride,offset){

    attributes[index] = {

        buffer: ab,

        size,

        type,

        normalized,

        stride,

        offset

    };

    return vap.apply(this,arguments);

};
gl.drawElements=function(mode,count,type,offset){

      ext.drawCalls.push({

          mode,

          count,

          type,

          offset,

          indexBuffer:eb,

          arrayBuffer:ab,

          attributes: JSON.parse(JSON.stringify(attributes))

      });
      ext.stats.drawCalls++;
      return de.apply(this,arguments);
   };
   console.log("UWE hooked",t);
   return gl;
 };
})();
