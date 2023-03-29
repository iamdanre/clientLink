<script setup>
// @ts-nocheck
import { HollowDotsSpinner } from 'epic-spinners'
import IconPlus from '../components/icons/IconPlus.vue';
import IconMinus from '../components/icons/IconMinus.vue';
import IconLink from '../components/icons/IconLink.vue';
import IconUnlink from '../components/icons/IconUnlink.vue';
import { ref } from 'vue';
import * as clientService from '../services/clientService.js';
import * as contactService from '../services/contactService.js';
import { reset } from '@formkit/core';
import instance from '../main.js';

const loading = ref(true);
const createClientForm = ref(false);
const clients = ref([]);
clientService.getAllClients().then((data) => {
  clients.value = data;
  //delay to show spinner if request is fast
  setTimeout(() => {
    loading.value = false;
  }, 850);
});

const createClient = async (fields) => {
  clientService.addClient(fields).then(
    (data) => {
      console.log(data);
      clients.value.push(data);
      // sort the clients by name
      clients.value.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      reset('clientForm');
      let message = `${data.name} created with client code: ${data.clientCode}`;
      instance.success(message, {
        position: "bottom-left",
        timeout: 6000,
        offset: "30px",
        transition: "scale",
      });
      createClientForm.value = false;
    },
    (error) => {
      console.log(error);
    }
  );
}

const contacts = ref([]);
const linkContactForm = ref(false);
const unLinkContactForm = ref(false);
const selectedContact = ref('');
const selectedClient = ref('');

contactService.getAllContacts().then((data) => {
  for (let i = 0; i < data.length; i++) {
    let contact = { value: data[i]._id, label: data[i].name + ' ' + data[i].surname + ' (' + data[i].email + ')' };
    contacts.value.push(contact);
  }
});

const linkContact = async (fields) => {
  clientService.linkContact(selectedClient.value.client._id, fields.contactId).then(
    (data) => {
      // update the client in the clients array
      for (let i = 0; i < clients.value.length; i++) {
        if (clients.value[i]._id === data._id) {
          clients.value[i] = data;
        }
      }
      reset('linkContactForm');
      // find contact in contacts array
      let contact;
      for (let i = 0; i < contacts.value.length; i++) {
        if (contacts.value[i].value === fields.contactId) {
          contact = contacts.value[i];
        }
      }
      let message = `${selectedClient.value.client.clientCode} linked to ${contact.label.split(' (')[0]}`;
      instance.success(message, {
        position: "bottom-left",
        timeout: 6000,
        offset: "30px",
        transition: "scale",
      });
      linkContactForm.value = false;
      selectedClient.value = '';
      selectedContact.value = '';
    },
    (error) => {
      console.log(error);
    }
  );
}

const unlinkContact = async (fields) => {
  console.log(selectedClient.value.client);
  clientService.unlinkContact(selectedClient.value.client._id, fields.contactId).then(
    (data) => {
      // update the client in the clients array
      for (let i = 0; i < clients.value.length; i++) {
        if (clients.value[i]._id === data._id) {
          clients.value[i] = data;
        }
      }
      reset('unLinkContactForm');
      // find contact in contacts array
      let contact;
      for (let i = 0; i < contacts.value.length; i++) {
        if (contacts.value[i].value === fields.contactId) {
          contact = contacts.value[i];
        }
      }
      let message = `${selectedClient.value.client.clientCode} unlinked from ${contact.label.split(' (')[0]}`;
      instance.success(message, {
        position: "bottom-left",
        timeout: 6000,
        offset: "30px",
        transition: "scale",
      });
      unLinkContactForm.value = false;
      selectedClient.value = '';
      selectedContact.value = '';
    },
    (error) => {
      console.log(error);
    }
  );
}

</script>

<template>
  <main>
    <div class="loading" v-if="loading">
      <hollow-dots-spinner :animation-duration="900" :dot-size="20" :dots-num="3" color="#00bd7e" />
    </div>

    <div class="createForm" v-if="createClientForm">
      <FormKit id="clientForm" type="form" @submit="createClient" submit-label="Create Client" :submit-attrs="{
        inputClass: 'submit-button'
      }" #default="{ value }">
        <FormKit type="text" name="name" id="clientName" validation="required:trim" label="Client Name"
          help="Enter client's full name" />
      </FormKit>
    </div>

    <div class="linkContactForm" v-if="linkContactForm && !createClientForm">
      <FormKit id="linkContactForm" type="form" @submit="linkContact" submit-label="Link Contact" :submit-attrs="{
        inputClass: 'submit-button'
      }">
        <FormKit type="select" name="contactId" id="contactId" validation="required" label="Contact to link"
          v-model="selectedContact" :options="contacts" help="Select contact" placeholder="Select contact" />
      </FormKit>
    </div>

    <div class="unLinkContactForm" v-if="unLinkContactForm && !createClientForm">
      <FormKit id="unlinkContactForm" type="form" @submit="unlinkContact" submit-label="Unlink Contact" :submit-attrs="{
        inputClass: 'submit-button'
      }">
        <FormKit type="select" name="contactId" id="contactId" validation="required" label="Contact to unlink"
          v-model="selectedContact" :options="contacts" help="Select contact" placeholder="Select contact" />
      </FormKit>
    </div>

    <div v-if="clients.length === 0 && !loading">
      <h1>No clients found</h1>
    </div>
    <div v-else>
      <table v-if="!loading">
        <tr>
          <th>Client Name</th>
          <th>Client Code</th>
          <th>Number of Linked Contacts</th>
        </tr>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.clientCode }}</td>
          <td class="centre">
            <IconUnlink @click="unLinkContactForm = true; selectedClient = { client }" />
            {{ client.linkedContacts.length }}
            <IconLink @click="linkContactForm = true; selectedClient = { client }" />
          </td>
        </tr>
      </table>
    </div>
  </main>
  <div v-if="!createClientForm" @click="createClientForm = true">
    <IconPlus />
  </div>
  <div v-else @click="createClientForm = false">
    <IconMinus />
  </div>
</template>

<style lang="scss">
$green: hsla(160, 100%, 37%, 1);

table {
  border-collapse: collapse;
  border: 1px solid black;
  padding: 5px;
  border-spacing: 5px;
  border-color: white;
  width: 100%;
}

@media (max-width: 1024px) {
  table {
    margin-top: 2rem;
  }

  .loading {
    margin-top: 6rem;
    align-items: baseline !important;
    height: auto !important;
  }
}

th {
  border: 1px solid black;
  border-spacing: 5px;
  border-color: white;
  color: $green;
}

td {
  border: 1px solid black;
  border-spacing: 5px;
  border-color: white;
  padding: 5px;
}

.centre {
  text-align: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.createForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.linkContactForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.unLinkContactForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  .submit-button {
    background-color: #F33A6A;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .submit-button:hover {
    background-color: darken(#F33A6A, 10%);
  }
}

.submit-button {
  background-color: $green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: darken($green, 10%);
  }
}

.success {
  padding: 0.75em;
  border-radius: 0.5em;
  background-color: lightgreen;
  margin: 1em 0;
}
</style>
