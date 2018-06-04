var fileURN = "http://192.168.203.39:8888/";

function uploadFiles(files, flag) {
	$("#" + files)
			.change(
					function() {
						if ($("#" + files).val().length > 0) {
							var index = $("#" + files).val().lastIndexOf(".") + 1;
							var suffix = $("#" + files).val().substring(index,
									$("#" + files).val().length);
							if (suffix.toLowerCase() == "png"
									|| suffix.toLowerCase() == "jpg"
									|| suffix.toLowerCase() == "jpeg") {
								$
										.ajaxFileUpload({
											url : "/file/upload_img.htm",
											secureuri : false,
											fileElementId : files,// file标签的id
											dataType : 'json',
											success : function(file) {
												if (file != ""
														&& typeof file != undefined) {
													var data = eval("(" + file
															+ ")");
													var uploadStatus = data.actionStatus;
													if (uploadStatus == 'success') {
														var message = eval("("
																+ data.actionMessage
																+ ")");
														var url = message.url;
														// 赋值文本框上传图片名字
														$("#img" + flag)
																.val(
																		message.fileName);
														// 赋值隐藏域图片地址
														$("#imgName" + flag)
																.val(url);
														// 赋值图片连接
														document
																.getElementById("imgId"
																		+ flag).src = fileURN
																+ url;
														// 赋值图片为显示状态
														document
																.getElementById('imgId'
																		+ flag).style.display = "block";

														if (flag == 1) {
															$('#applyForm')
																	.data(
																			'bootstrapValidator')
																	.updateStatus(
																			'businessLicenseName',
																			'NOT_VALIDATED',
																			null)
																	.validateField(
																			'businessLicenseName');
														}
														if (flag == 2) {
															$('#applyForm')
																	.data(
																			'bootstrapValidator')
																	.updateStatus(
																			'organizeCodeName',
																			'NOT_VALIDATED',
																			null)
																	.validateField(
																			'organizeCodeName');
														}
														if (flag == 3) {
															$('#applyForm')
																	.data(
																			'bootstrapValidator')
																	.updateStatus(
																			'taxRegistrationName',
																			'NOT_VALIDATED',
																			null)
																	.validateField(
																			'taxRegistrationName');
														}
														if (flag == 4) {
															$('#applyForm')
																	.data(
																			'bootstrapValidator')
																	.updateStatus(
																			'payFileName',
																			'NOT_VALIDATED',
																			null)
																	.validateField(
																			'payFileName');
														}
														$("#imgspan"+flag).hide();

													} else {
														var mesg = data.actionMessage;
														$("#imgspan" + flag)
																.text(mesg);
														document
																.getElementById('imgspan'
																		+ flag).style.display = "block";
														return false;
													}
												} else {
													alert("上传失败");
													return false;
												}
											}
										});
							} else {
								$("#imgspan" + flag).text(
										"请选择.png 和.jpg及.jpeg格式的图片上传!")
								document.getElementById("imgspan" + flag).style.display = "block";
								return false;
							}
						}

					})
}

function upload(uploadFile) {
	$("#" + uploadFile)
			.change(
					function() {
						if ($("#" + uploadFile).val().length > 0) {
							var index = $("#" + uploadFile).val().lastIndexOf(
									".") + 1;
							var suffix = $("#" + uploadFile).val().substring(
									index, $("#" + uploadFile).val().length);
							if (suffix.toLowerCase() == "png"
									|| suffix.toLowerCase() == "jpg"
									|| suffix.toLowerCase() == "jpeg") {
								$
										.ajaxFileUpload({
											url : "/file/upload_img.htm",
											secureuri : false,
											fileElementId : uploadFile,// file标签的id
											dataType : 'json',
											success : function(file) {
												if (file != ""
														&& typeof file != undefined) {
													var data = eval("(" + file
															+ ")");

													var uploadStatus = data.actionStatus;
													if (uploadStatus == 'success') {
														var message = eval("("
																+ data.actionMessage
																+ ")")

														var url = message.url;

														$("#fileName")
																.val(
																		message.fileName);

														$("#fileUrl").val(url);

														document
																.getElementById("imgId").src = fileURN
																+ url;
														document
																.getElementById('imgId').style.display = "block";
														$("#imgspan").hide();
													} else {
														var mesg = data.actionMessage;
														$("#imgspan")
																.text(mesg);
														document
																.getElementById("imgspan").style.display = "block";
														return false;
													}
												} else {
													alert("上传失败");
													return false;
												}
											}
										});
							} else {
								$("#imgspan").text(
										"请选择.png 和.jpg及.jpeg格式的图片上传!")
								document.getElementById("imgspan").style.display = "block";
								return false;
							}
						}

					})
}
