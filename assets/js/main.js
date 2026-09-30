(function(){
  "use strict";
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header ---------- */
  var hdr=$("#hdr");
  var onScroll=function(){ hdr.classList.toggle("stuck", window.scrollY>28); };
  onScroll(); window.addEventListener("scroll",onScroll,{passive:true});

  /* ---------- generic service tabs ---------- */
  $$(".svc-tabs").forEach(function(wrap){
    var btns=$$(".svc-tab-nav button",wrap);
    var panels=$$(".svc-tab-panel",wrap);
    if(!btns.length||!panels.length) return;
    btns.forEach(function(btn){
      btn.addEventListener("click",function(){
        btns.forEach(function(b){ b.classList.remove("on"); b.setAttribute("aria-selected","false"); });
        panels.forEach(function(p){ p.classList.remove("on"); });
        btn.classList.add("on"); btn.setAttribute("aria-selected","true");
        var target=wrap.querySelector('.svc-tab-panel[data-tab="'+btn.dataset.tab+'"]');
        if(target) target.classList.add("on");
      });
    });
  });

  /* ---------- impact counters ---------- */
  var impactNums=$$(".impact-num");
  if(impactNums.length){
    if(reduce){
      impactNums.forEach(function(el){ el.textContent=el.dataset.count; });
    } else {
      var animateCount=function(el){
        var target=parseInt(el.dataset.count,10)||0;
        var duration=1600, start=null;
        var step=function(ts){
          if(!start) start=ts;
          var progress=Math.min((ts-start)/duration,1);
          var eased=1-Math.pow(1-progress,3);
          el.textContent=Math.floor(eased*target);
          if(progress<1) requestAnimationFrame(step);
          else el.textContent=target;
        };
        requestAnimationFrame(step);
      };
      var impactIO=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCount(entry.target);
            impactIO.unobserve(entry.target);
          }
        });
      },{threshold:.5});
      impactNums.forEach(function(el){ impactIO.observe(el); });
    }
  }

  /* ---------- nav dropdowns ---------- */
  $$(".nav-drop").forEach(function(drop){
    var dbtn=drop.querySelector("button"), menu=drop.querySelector(".drop");
    if(!dbtn||!menu) return;
    var setDrop=function(open){ drop.classList.toggle("open",open); dbtn.setAttribute("aria-expanded",open?"true":"false"); };
    drop.addEventListener("mouseenter",function(){setDrop(true)});
    drop.addEventListener("mouseleave",function(){setDrop(false)});
    dbtn.addEventListener("click",function(e){e.preventDefault();setDrop(!drop.classList.contains("open"))});
    drop.addEventListener("keydown",function(e){ if(e.key==="Escape"){setDrop(false);dbtn.focus();} });
    document.addEventListener("click",function(e){ if(!drop.contains(e.target)) setDrop(false); });
    $$("a",menu).forEach(function(a){ a.addEventListener("click",function(){setDrop(false)}); });
  });

  /* ---------- mobile menu ---------- */
  var burger=$("#burger"), mnav=$("#mnav"), scrim=$("#scrim"), mclose=$("#mclose");
  var openMenu=function(open){
    document.body.classList.toggle("menu-open",open);
    burger.setAttribute("aria-expanded",open?"true":"false");
    burger.setAttribute("aria-label",open?"Close menu":"Open menu");
    mnav.setAttribute("aria-hidden",open?"false":"true");
    document.body.style.overflow=open?"hidden":"";
    if(open){ setTimeout(function(){mclose.focus()},220); }
  };
  burger.addEventListener("click",function(){openMenu(!document.body.classList.contains("menu-open"))});
  mclose.addEventListener("click",function(){openMenu(false);burger.focus()});
  scrim.addEventListener("click",function(){openMenu(false)});
  $$("#mnav a").forEach(function(a){ a.addEventListener("click",function(){openMenu(false)}); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&document.body.classList.contains("menu-open")) {openMenu(false);burger.focus();} });

  $$(".macc").forEach(function(macc){
    var maccBtn=macc.querySelector(":scope > button"), maccP=macc.querySelector(".macc-panel");
    if(!maccBtn||!maccP) return;
    maccBtn.addEventListener("click",function(){
      var open=!macc.classList.contains("open");
      macc.classList.toggle("open",open);
      maccBtn.setAttribute("aria-expanded",open?"true":"false");
      maccP.style.maxHeight=open?maccP.scrollHeight+"px":"0px";
    });
  });

  /* ---------- scroll reveal ---------- */
  var revs=$$(".rv");
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    },{rootMargin:"0px 0px -8% 0px",threshold:.12});
    revs.forEach(function(el){io.observe(el)});
  } else { revs.forEach(function(el){el.classList.add("in")}); }

  /* ---------- process timeline ---------- */
  var track=$("#ptrack"), steps=track?$$(".step",track):[];
  if(track && "IntersectionObserver" in window){
    var pio=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        steps.forEach(function(s,i){ setTimeout(function(){ s.classList.add("on"); track.style.setProperty("--p",((i+1)/steps.length*100)+"%"); }, reduce?0:i*260); });
        pio.disconnect();
      });
    },{threshold:.3});
    pio.observe(track);
  } else if(track){ steps.forEach(function(s){s.classList.add("on")}); track.style.setProperty("--p","100%"); }

  /* ---------- ERP dashboard ---------- */
  var bars=function(vals,labels,title,note){
    var b=vals.map(function(v){return '<div style="height:'+v+'%"></div>'}).join("");
    var l=labels.map(function(t){return '<span>'+t+'</span>'}).join("");
    return '<div class="panel"><h4>'+title+'<em>'+note+'</em></h4><div class="bars">'+b+'</div><div class="blabels">'+l+'</div></div>';
  };
  var rows=function(title,items){
    var r=items.map(function(it){
      return '<div><div class="row-i"><span>'+it[0]+'</span><b>'+it[1]+'</b></div><div class="meter"><i style="--w:'+it[2]+'%"></i></div></div>';
    }).join("");
    return '<div class="panel"><h4>'+title+'</h4><div class="rows">'+r+'</div></div>';
  };
  var kpi=function(items){
    return '<div class="kpis">'+items.map(function(k){
      return '<div class="kpi"><span>'+k[0]+'</span><b>'+k[1]+'</b><i class="'+(k[3]||'')+'">'+k[2]+'</i></div>';
    }).join("")+'</div>';
  };
  var M=["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"];
  var views={
    overview:kpi([["Revenue this quarter","₹ N/A","tracked in one ledger"],["Open orders","184","across 3 channels"],["Inventory value","Live","synced hourly"],["Approvals pending","2","down from 27","dn"]])
      +'<div class="dash-panels">'+bars([44,58,52,70,64,82,76,92],M,"Revenue trend","last 8 months")
      +rows("Module adoption",[["Finance","Live",100],["Sales &amp; CRM","Live",100],["Inventory","Live",88],["HR &amp; Payroll","Phase 2",46]])+'</div>',
    sales:kpi([["Pipeline stages","6","standardised"],["Quote to order","Same day","was 4 days","dn"],["Repeat customers","Tracked","by segment"],["Channels","3","one order book"]])
      +'<div class="dash-panels">'+bars([38,50,46,62,58,74,68,86],M,"Orders by month","all channels")
      +rows("Pipeline by stage",[["Enquiry","41",82],["Qualified","28",56],["Quoted","19",38],["Won","12",24]])+'</div>',
    inventory:kpi([["SKUs managed","Live","across 2 warehouses"],["Stock alerts","6","auto-raised"],["Reorder","Auto","rule based"],["Stock accuracy","Reconciled","daily"]])
      +'<div class="dash-panels">'+bars([62,55,68,48,72,60,78,66],M,"Stock movement","inbound vs outbound")
      +rows("Warehouse utilisation",[["Main warehouse","78%",78],["Regional store","54%",54],["In transit","22%",22],["Reserved","36%",36]])+'</div>',
    finance:kpi([["Month-end close","Faster","single ledger"],["Invoices","Automated","from orders"],["Receivables","Aged view","real time"],["Audit trail","Complete","per entry"]])
      +'<div class="dash-panels">'+bars([50,64,58,72,66,80,74,88],M,"Cash position","net inflow")
      +rows("Receivables ageing",[["0–30 days","64%",64],["31–60 days","21%",21],["61–90 days","10%",10],["90+ days","5%",5]])+'</div>',
    people:kpi([["Payroll runs","On schedule","one cycle"],["Leave requests","Self-service","approved in-app"],["Onboarding","Checklist","standardised"],["Records","Centralised","one profile"]])
      +'<div class="dash-panels">'+bars([40,44,52,50,58,62,60,68],M,"Headcount by month","permanent &amp; contract")
      +rows("Process completion",[["Onboarding tasks","92%",92],["Policy acknowledgements","81%",81],["Appraisal cycle","64%",64],["Training records","57%",57]])+'</div>'
  };
  var dmain=$("#dmain"), dash=$("#dash");
  if(dmain&&dash){
  var renderView=function(v){
    dash.classList.remove("live");
    dmain.innerHTML=views[v];
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ dash.classList.add("live"); }); });
  };
  renderView("overview");
  $$(".dash-tabs button").forEach(function(b){
    b.addEventListener("click",function(){
      $$(".dash-tabs button").forEach(function(x){x.setAttribute("aria-selected","false")});
      b.setAttribute("aria-selected","true");
      renderView(b.dataset.v);
    });
  });
  }

  /* ---------- industries ---------- */
  var IND=[
    ["Manufacturing",'<path d="M3 21V10l5 3v-3l5 3v-3l5 3v8H3Z"/><path d="M3 21h16"/>',"Production, inventory and costing usually sit in separate places. We connect them so a plant manager and a finance lead are reading the same numbers.",
      ["Production planning tied to live inventory","Costing and margin visibility per batch","Procurement and vendor management","Quality records ready for audit"]],
    ["Retail & Distribution",'<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',"Multi-location stock and multi-channel orders create the same problem twice: nobody trusts the stock figure. One order book fixes most of it.",
      ["Unified stock across stores and warehouses","Order management across channels","Automated reordering rules","Customer and loyalty data in one place"]],
    ["Real Estate",'<path d="M4 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/>',"Long sales cycles and heavy documentation make follow-up and paperwork the real bottleneck, not demand.",
      ["Lead and enquiry tracking through to booking","Project and unit inventory management","Payment schedules and collections","Document workflows and approvals"]],
    ["Healthcare",'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',"Administrative load pulls staff away from patients. Most of the gain comes from scheduling, records and billing working together.",
      ["Appointment and resource scheduling","Patient records with controlled access","Billing, claims and reconciliation","Inventory for consumables and pharmacy"]],
    ["Education",'<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',"Admissions, fees and academic records are usually three systems that don't talk. Parents and staff feel it first.",
      ["Admissions and enrolment workflows","Fee management and receipts","Attendance and academic records","Parent and student communication"]],
    ["Logistics",'<rect x="1" y="7" width="14" height="10" rx="1.5"/><path d="M15 11h4l3 3v3h-7"/><circle cx="6" cy="19" r="1.7"/><circle cx="17" cy="19" r="1.7"/>',"Visibility is the product. When dispatch, fleet and billing share data, exceptions surface before the customer calls.",
      ["Shipment and dispatch tracking","Fleet and route information","Warehouse and consignment management","Automated billing from delivery data"]],
    ["Professional Services",'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',"Time, projects and invoicing are the whole business model, so small leaks in tracking cost real margin.",
      ["Project and resource planning","Time and effort tracking","Client billing and retainer management","Document and knowledge management"]],
    ["Other Businesses",'<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',"If your operation doesn't fit a category, that's usually a sign the process is specific enough to be worth building around.",
      ["Process mapping and system evaluation","Custom applications for specific workflows","Integration between existing tools","Automation of repetitive admin work"]]
  ];
  var indnav=$("#indnav");
  if(indnav){
    indnav.innerHTML=IND.map(function(d,i){
      return '<div class="ind-tile">'
        +'<span class="ind-tile-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">'+d[1]+'</svg></span>'
        +'<span class="ind-tile-label">'+d[0]+'</span>'
        +'</div>';
    }).join("");
  }

  /* ---------- testimonials ---------- */
  var ttrack=$("#ttrack"), dots=$("#tdots"), ti=0;
  if(ttrack&&dots){
  var slides=$$(".tst-slide",ttrack);
  dots.innerHTML=slides.map(function(_,i){
    return '<button role="tab" aria-label="Testimonial '+(i+1)+'" aria-current="'+(i?"false":"true")+'"></button>';
  }).join("");
  var dbs=$$("button",dots);
  var goT=function(i){
    ti=(i+slides.length)%slides.length;
    ttrack.style.transform="translateX("+(-ti*100)+"%)";
    dbs.forEach(function(d,j){d.setAttribute("aria-current",j===ti?"true":"false")});
    slides.forEach(function(s,j){ s.setAttribute("aria-hidden", j===ti?"false":"true"); });
  };
  goT(0);
  $("#tprev").addEventListener("click",function(){goT(ti-1)});
  $("#tnext").addEventListener("click",function(){goT(ti+1)});
  dbs.forEach(function(d,i){ d.addEventListener("click",function(){goT(i)}); });
  }

  /* ---------- send every enquiry to Google Forms (via enquiry-submit.php) ---------- */
  var RECAPTCHA_KEY="6LcKZ9ctAAAAAD-7CXmf9Pqk4FBq_D4ES0Wn8ISH";
  if($(".form,.lform")&&!window.grecaptcha){
    var rc=document.createElement("script");
    rc.src="https://www.google.com/recaptcha/api.js?render="+RECAPTCHA_KEY; rc.async=true;
    document.head.appendChild(rc);
  }
  var sendEnquiry=function(f,data,onDone){
    var btn=f.querySelector('button[type="submit"]'), btnText=btn.textContent;
    var status=f.querySelector(".form-error");
    if(!status){
      status=document.createElement("p"); status.className="err form-error"; status.setAttribute("role","alert");
      btn.parentNode.insertBefore(status,btn);
    }
    status.classList.remove("show");
    btn.disabled=true; btn.textContent="Sending...";
    var reset=function(){ btn.disabled=false; btn.textContent=btnText; };
    var fail=function(err){
      reset();
      status.textContent=err||"Sorry, something went wrong. Please try again or call us on +91 89517 34760.";
      status.classList.add("show");
    };
    var post=function(token){
      var fd=new FormData();
      Object.keys(data).forEach(function(k){ fd.append(k,data[k]); });
      fd.append("consent","Yes");
      fd.append("token_generate",token||"");
      fetch("enquiry-submit.php",{method:"POST",body:fd})
        .then(function(r){ return r.json(); })
        .then(function(res){ if(!res.ok) return fail(res.error); reset(); onDone(); })
        .catch(function(){ fail(); });
    };
    if(window.grecaptcha&&grecaptcha.execute){
      grecaptcha.ready(function(){
        grecaptcha.execute(RECAPTCHA_KEY,{action:"enquiry"}).then(post,function(){ fail("Verification failed. Please try again."); });
      });
    } else fail("Verification is still loading. Please try again in a moment.");
  };

  /* ---------- inline field errors (used by every form) ---------- */
  var ERR_MSG={
    name:"Please enter a valid name using letters only, e.g. Arpita S",
    phone:"Please enter a valid 10-digit mobile number, e.g. 98765 43210",
    email:"Please enter a valid email address, e.g. name@gmail.com",
    service:"Please choose the service you are interested in.",
    message:"Please tell us a little about your requirement.",
    consent:"Please tick this box to continue."
  };
  var setFieldError=function(el,msg){
    var box=el.closest(".field,.consent"), err;
    if(box){ // contact / popup form: wrapper already has its own .err span
      err=box.querySelector(".err");
      box.classList.toggle("bad",!!msg);
    } else { // service page forms: add the message right under the field
      var anchor=el.type==="checkbox"?el.closest("label"):(el.closest(".lform-field")||el);
      err=anchor.nextElementSibling;
      if(!err||!err.classList.contains("lf-err")){
        if(!msg) return;
        err=document.createElement("span"); err.className="err lf-err";
        anchor.parentNode.insertBefore(err,anchor.nextSibling);
      }
      el.classList.toggle("is-bad",!!msg);
      err.classList.toggle("show",!!msg);
    }
    if(err&&msg) err.textContent=msg;
    el.setAttribute("aria-invalid",msg?"true":"false");
  };
  // checks: [[field, isValid, ERR_MSG key], ...] — marks every bad field and focuses the first
  var validateFields=function(checks){
    var first=null;
    checks.forEach(function(c){
      setFieldError(c[0],c[1]?"":ERR_MSG[c[2]]);
      if(!c[1]&&!first) first=c[0];
    });
    if(first) first.focus();
    return !first;
  };
  var clearOnEdit=function(f){
    $$("input,select,textarea",f).forEach(function(el){
      var clear=function(){ setFieldError(el,""); };
      el.addEventListener("input",clear); el.addEventListener("change",clear);
    });
  };
  var NAME_RE=/^[A-Za-z]+([ '.-][A-Za-z]+)*$/, EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // exactly 10 digits (spaces/dashes allowed, optional +91 in front)
  var PHONE_RE={test:function(v){ return /^(\+91)?\d{10}$/.test(v.replace(/[\s-]/g,"")); }};

  /* ---------- contact form / home popup form ---------- */
  var form=$("#form");
  if(form){
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var name=$("#f-name"),email=$("#f-email"),phone=$("#f-phone"),svc=$("#f-service"),msg=$("#f-msg"),consent=$("#f-consent");
    var nameVal=name.value.trim(), phoneVal=phone.value.trim();
    if(!validateFields([
      [name,nameVal.length>1&&NAME_RE.test(nameVal),"name"],
      [phone,PHONE_RE.test(phoneVal),"phone"],
      [email,EMAIL_RE.test(email.value.trim()),"email"],
      [svc,!!svc.value,"service"],
      [msg,msg.value.trim().length>4,"message"],
      [consent,consent.checked,"consent"]
    ])) return;

    sendEnquiry(form,{name:nameVal,phone:phoneVal,email:email.value.trim(),service:svc.value,message:msg.value.trim()},function(){
      form.classList.add("done");
      var sentMsg=$("#sent-msg");
      if(sentMsg) sentMsg.scrollIntoView({block:"nearest",behavior:reduce?"auto":"smooth"});
    });
  });
  clearOnEdit(form);
  }

  /* ---------- home page enquiry popup ---------- */
  var pfOverlay=$("#pfOverlay"), pfClose=$("#pfClose"), pfTrigger=$("#pfTrigger");
  if(pfOverlay&&pfClose){
    var pfShown=false;
    var pfOpen=function(){ pfShown=true; pfOverlay.classList.add("open"); document.body.classList.add("pf-open"); };
    var pfHide=function(){ pfOverlay.classList.remove("open"); document.body.classList.remove("pf-open"); };
    pfClose.addEventListener("click",pfHide);
    pfOverlay.addEventListener("click",function(e){ if(e.target===pfOverlay) pfHide(); });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&pfOverlay.classList.contains("open")) pfHide(); });
    if(pfTrigger) pfTrigger.addEventListener("click",function(e){ e.preventDefault(); pfOpen(); });

    try{
      if(!sessionStorage.getItem("pfShown")){
        setTimeout(function(){ if(!pfShown){ pfOpen(); sessionStorage.setItem("pfShown","1"); } },4000);
      }
    }catch(e){}
  }

  /* ---------- service page consultation forms ---------- */
  $$(".lform").forEach(function(lf){
    var serviceSel=lf.querySelector('[name="service"]');
    var platformSel=lf.querySelector('[name="platform"]'), platformOther=lf.querySelector('[name="platform_other"]');
    if(platformSel&&platformOther){
      var syncPlatformOther=function(){ platformOther.classList.toggle("is-open",platformSel.value==="Other"); };
      platformSel.addEventListener("change",syncPlatformOther);
      syncPlatformOther();
    }

    lf.noValidate=true; // our inline messages replace the browser's own tooltip
    clearOnEdit(lf);
    lf.addEventListener("submit",function(e){
      e.preventDefault();
      var name=lf.querySelector('[name="name"]'), phone=lf.querySelector('[name="phone"]'),
          email=lf.querySelector('[name="email"]'), msg=lf.querySelector('[name="message"]'),
          consent=lf.querySelector('[name="consent"]');
      var checks=[
        [name,NAME_RE.test(name.value.trim()),"name"],
        [phone,PHONE_RE.test(phone.value.trim()),"phone"],
        [email,EMAIL_RE.test(email.value.trim()),"email"]
      ];
      if(serviceSel&&serviceSel.required) checks.push([serviceSel,!!serviceSel.value,"service"]);
      if(msg&&msg.required) checks.push([msg,!!msg.value.trim(),"message"]);
      if(consent) checks.push([consent,consent.checked,"consent"]);
      if(!validateFields(checks)) return;
      var service=(serviceSel&&serviceSel.value)||lf.dataset.service||"Service Enquiry";
      var message=(msg&&msg.value.trim())||"Not specified";
      if(platformSel&&platformSel.value){
        var platform=platformSel.value==="Other"&&platformOther&&platformOther.value.trim()?platformOther.value.trim():platformSel.value;
        message="Preferred Platform: "+platform+"\n\n"+message;
      }
      sendEnquiry(lf,{name:name.value.trim(),phone:phone.value.trim(),email:email.value.trim(),service:service,message:message},function(){
        var done=document.createElement("div");
        done.className="sent show"; done.setAttribute("role","status");
        done.innerHTML='<h3>Thank you!</h3><p>We\'ve received your request and will get back to you within one business day.</p>';
        lf.parentNode.replaceChild(done,lf);
      });
    });
  });

  /* ---------- back to top ---------- */
  var totop=$("#totop");
  if(totop){
    var toggleTop=function(){ totop.classList.toggle("show", window.scrollY>560); };
    toggleTop(); window.addEventListener("scroll",toggleTop,{passive:true});
    totop.addEventListener("click",function(){ window.scrollTo({top:0,behavior:reduce?"auto":"smooth"}); });
  }

  /* ---------- prefill the enquiry form from ?service= ---------- */
  var q=new URLSearchParams(window.location.search).get("service");
  var sel=$("#f-service");
  if(q&&sel){
    Array.prototype.forEach.call(sel.options,function(o){
      if(o.value.toLowerCase()===q.toLowerCase()) sel.value=o.value;
    });
  }
})();
