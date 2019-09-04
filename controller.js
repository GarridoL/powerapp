// basic functionalities
$(document).ready(function () {

  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
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
    client.unsubscribe($('#Subscribe-topic').val());
    $('#span').html('');
    $('#Subscribe-topic').val('');
  })

  document.getElementById('btnConnect').addEventListener("click", function (e) {
    e.preventDefault();
    $('#status').val("Connecting...");
    isconnected = true;
    client.on("connect", function () { $('#status').val('Successfully connected.'); })
    client.on("message", function (topic, payload) {var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds(); console.log("Topic: " + topic + " Payload: " + payload); $('table').append('<tr><td>' + topic + '</td><td>' + payload + '</td><td>' + time + '</td></tr>'); })
    $('#btnSubscribe').attr('disabled', false);

  })

  document.getElementById('btnDisconnect').addEventListener("click", function (e) {
    e.preventDefault();
    dataSubcribeTo = '';
    isconnected = false;
    $('#span').html(dataSubcribeTo);
    $('#Subscribe-topic').val('');
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
    $('#btnSubscribe').attr('disabled', true);
    $("#table").find("tr:gt(0)").remove();
    $('#status').val('Successfully disconnected.');
  })

  document.getElementById('btnPublish').addEventListener("click", function (e) {
    e.preventDefault();
    if (isUnsubscribe == true) {
      alert('Subscribe first!')
    } else {
      if (isconnected == true) {
        if ($('#Publish-topic').val() == '' && $('#Publish-payload').val() == '') {
          alert('No Topic provided!');
        } else {
          
          if (subscribeValue == $('#Publish-topic').val()) {
            console.log("Topic: " + $('#Publish-topic').val() + " Payload: " + $('#Publish-payload').val())
          client.publish($('#Publish-topic').val(), $('#Publish-payload').val());
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            $('table').append('<tr><td>' + $('#Publish-topic').val() + '</td><td>' + $('#Publish-payload').val() + '</td><td>' + time + '</td></tr>');
          }
        }
      } else {
        alert('Subscribe first!')
      }
    }
  })
});