var complexity=4;
var pattern='0000';
var attempts = 500000;
var blocks=0;
var prev='0000000000000000000000000000000000000000000000000000000000000000';

//update the complexity pattern
function updatePattern() {
	pattern = $("#complexity").val();
	complexity = pattern.length;
	updateChain(1);
}
function updateAttempts() {
	attempts = $("#attempts").val();
}
//get the block info for hashing
function getText(block) {
      return $("#block"+block+"number").val() +
             $("#block"+block+"nonce").val() +
             $("#block"+block+"data").val() +
             $("#block"+block+"parent").val();
}

//set the attributes of the newly added block
function setAttributes(block) {
	$("#blocknumber").val(block);
	$("#blockparent").val(prev);
	$("#blockwell").attr("id", "block"+block+"well");
	$("#numlabel").attr("for", "block"+block+"number");
	$("#blocknumber").attr({"id": "block"+block+"number",
							"onkeyup": "updateChain("+block+");"});
	$("#nonlabel").attr("for", "block"+block+"nonce");
	$("#blocknonce").attr({"id": "block"+block+"nonce",
						   "onkeyup": "updateChain("+block+");"});
	$("#datalabel").attr("for", "block"+block+"data");
	$("#blockdata").attr({"id": "block"+block+"data",
						  "onkeyup": "updateChain("+block+");"});
	$("#parentlabel").attr("for", "block"+block+"parent");
	$("#blockparent").attr("id", "block"+block+"parent");
	$("#hashlabel").attr("for", "block"+block+"hash");
	$("#blockhash").attr("id", "block"+block+"hash");
	$("#blockmine").attr({"id": "block"+block+"mineButton",
						  "onclick": "mine("+block+",true);"});
}

//add new block to the chain
function addBlock() {
	
	if (blocks > 0) {
		prev = $("#block"+blocks+"hash").val();
	}
	blocks += 1;
	var block = blocks;
	$("#block-row").append($("<div class='col-xs-6'></div>").load("/block.html", function(){
		setAttributes(block);
		updateHash(block);
	}));
}

function sha256(block) {
  return CryptoJS.SHA256(getText(block));
}

function updateState(block) {
  if ($("#block"+block+"hash").val().substr(0, complexity) === pattern && $("#block"+block+"parent").val().substr(0, complexity) === pattern) {
    $("#block"+block+"well").removeClass("bad-state").addClass("good-state");
  }
  else {
    $("#block"+block+"well").removeClass("good-state").addClass("bad-state");
  }
}
//update the block's hash on any change
function updateHash(block) {
  $("#block"+block+"hash").val(sha256(block));
  updateState(block);
}
//update the chain on any change
function updateChain(block) {
  for (var x = block; x <= blocks; x++) {
    if (x > 1) {
      $("#block"+x+"parent").val($("#block"+(x-1).toString()+"hash").val());
    }
    updateHash(x);
  }
}
//mine the block
function mine(block, isChain) {
  for (var x = 0; x <= attempts; x++) {
    $("#block"+block+"nonce").val(x);
    $("#block"+block+"hash").val(sha256(block));
    if ($("#block"+block+"hash").val().substr(0, complexity) === pattern) {
      if (isChain) {
        updateChain(block);
      }
      else {
        updateState(block);
      }
      break;
    }
  }
}
