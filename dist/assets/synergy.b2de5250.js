import{I as t}from"./index.2854391f.js";function u(e){return t.post({url:"/pending_tasks/selectByPage",params:e})}function n(e){return t.post({url:"/elder/selectByPage",params:e})}function a(e){return t.post({url:"/applications/selectByPage",params:e})}function o(e){return t.get({url:"/elder",params:e})}function l(e){return t.post({url:"/elder/create",params:e})}function s(e){return t.post({url:"/elder/submit",params:e})}function c(e){return t.put({url:`/elder/reject?retreatCode=${e.retreatCode}&reject=${e.reject}&taskId=${e.taskId}`})}function d(e){return t.put({url:`/elder?retreatCode=${e.retreatCode}&message=${e.message}&taskId=${e.taskId}`})}function i(e){return t.put({url:`/elder/revocation?retreatCode=${e.retreatCode}&flowStatus=${e.flowStatus}&taskId=${e.taskId}`})}function f(e){return t.put({url:`/elder/cancel?retreatCode=${e.retreatCode}&taskId=${e.taskId}`})}function g(e){return t.put({url:"/retreat_bills/uploadRefundVoucher",params:e})}function p(e){return t.get({url:"/retreat_bills",params:e})}export{p as a,o as b,l as c,i as d,s as e,u as f,n as g,a as h,f as i,c as r,d as t,g as u};
