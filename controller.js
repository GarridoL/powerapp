// basic functionalities
$(document).ready(function () {

  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  var dataSubcribeTo = '';
  var subscribeValue = '';
  var isconnected = false;
  var isUnsubscribe = false;

  document.getElementById('btnSubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    isUnsubscribe = false;
    if (isconnected == false) {
      alert('Connect first!');
      
    } else {
      if ($('#Subscribe-topic').val() == '') {
        alert('No Topic provided!')
      } else {
        client.subscribe($('#Subscribe-topic').val());
        dataSubcribeTo = 'You have subscribed to the topic ' + $('#Subscribe-topic').val();
        $('#span').html(dataSubcribeTo);
        subscribeValue = $('#Subscribe-topic').val();
      }
      
    }
  })

  document.getElementById('btnUnsubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    isUnsubscribe = true;
    $('#span').html('');
    $('#Subscribe-topic').val('');
  })

  document.getElementById('btnConnect').addEventListener("click", function (e) {
    e.preventDefault();
    isconnected = true;
    client.on("connect", function () {})
    $('#btnSubscribe').attr('disabled',false);
  })

  document.getElementById('btnDisconnect').addEventListener("click", function (e) {
    e.preventDefault();
    dataSubcribeTo = '';
    isconnected = false;
    $('#span').html(dataSubcribeTo);
    $('#Subscribe-topic').val('');
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
    $('#btnSubscribe').attr('disabled',true);
    $("#table").find("tr:gt(0)").remove();
  })

  document.getElementById('btnPublish').addEventListener("click", function (e) {
    e.preventDefault();
    client.publish($('#Publish-topic').val(), $('#Publish-payload').val());
    if (isUnsubscribe == true) {
      alert('Subscribe first!')
    } else {
      if (isconnected == true) {
        if ($('#Publish-topic').val() == '' && $('#Publish-payload').val() == '') {
          alert('No Topic provided!');
        } else {
          client.on("message", function (topic, payload) {})
          client.publish($('#Publish-topic').val(), $('#Publish-payload').val());
          if (subscribeValue == $('#Publish-topic').val()) {
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            $('table').append('<tr><td>'+$('#Publish-topic').val()+'</td><td>'+$('#Publish-payload').val()+'</td><td>'+time+'</td></tr>');
          }
        }
      } else {
        alert('Subscribe first!')
      }
    }
  })

  // // advance functionalities
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  // client.subscribe("mqtt/demo", function (err){
  //   if (err){
  //     console.log(err);
  //   } else {
  //     console.log("subscribed")
  //   }
  // })

  // client.on("connect", function(){
  //     console.log("Successfully connected");
  // })

  // client.on("message", function (topic, payload) {
  //   console.log([topic, payload].join(": "));
  //   client.end();
  // })

  // client.publish("mqtt/demo", "hello world!", function(err){
  //   if (err){
  //     console.log(err)
  //   } else {
  //     console.log("published")
  //   }
  // })
});